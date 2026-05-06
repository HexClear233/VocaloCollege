"""
get_bv.py —— 爬取B站用户在特定时间段内发布视频的 BV 号

功能说明：
  1. 从 uidlist.txt 读取 B站 UID（每行一个）
  2. 对每个 UID 调用 B站 API 分页获取其投稿视频
  3. 按指定时间段 (start_date ~ end_date) 过滤视频
  4. 收集所有 bvid 并去重
  5. 输出去重后的 bvid 集合到 bv_result.txt

依赖：仅需 Python 3 标准库 (requests 需自行安装: pip install requests)

使用方式：
  python get_bv.py [--start YYYY-MM-DD] [--end YYYY-MM-DD] [--cookie SESSDATA=xxx]
"""

import argparse
import hashlib
import json
import os
import random
import re
import sys
import time
import urllib.parse
from datetime import datetime, timezone, timedelta

try:
    import requests
except ImportError:
    print("错误: 需要 requests 库，请执行 pip install requests")
    sys.exit(1)

# ============================================================
# 配置区
# ============================================================

# 文件路径（可与脚本同目录，也可自定义）
UIDLIST_FILE = "uidlist_20260430.txt"
OUTPUT_FILE = "bv_result.txt"

# API 分页大小（B站支持最大 50）
PAGE_SIZE = 50

# 请求间隔基础值（秒）
REQUEST_INTERVAL = 0.3

# 单次请求最大重试次数
MAX_RETRIES = 3

# 重试等待基础时间（秒）
RETRY_DELAY = 3

# WBI 签名用的混淆字符表（来自 B站前端源码）
# 参考: https://github.com/SocialSisterYi/bilibili-API-collect
WBI_MIXIN_KEY_ENC_TAB = [
    46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35,
    27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13,
    37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4,
    22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
]

# 时区设置为东八区（北京时间）
TZ_SHANGHAI = timezone(timedelta(hours=8))

DEFAULT_START_TIME = '2026-03-01'
DEFAULT_START_TIME = '2026-07-01'
DEFAULT_BVID_PATH = './bvid_202607.txt'
DEFAULT_FAIL_UID_PATH = './uid_202607_fail.txt'
DEFAULT_READ_UID_PATH = './read_uidlist.txt'

# 从config.json读取SESSDATA
try:    
    with open("config.json", "r", encoding="utf-8") as config_file:
        config = json.load(config_file)
        SESSDATA = config.get("SESSDATA", "")
except FileNotFoundError:
    SESSDATA = ""

# ============================================================
# 请求头 & Cookie
# ============================================================

def build_headers(sessdata: str = "") -> dict:
    """构建请求头（与 show_info.py 保持一致的方式）"""
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/125.0.0.0 Safari/537.36"
        ),
        "Referer": "https://www.bilibili.com/",  # 注意尾部斜杠
    }
    if sessdata:
        headers["Cookie"] = f"SESSDATA={sessdata}"
    return headers


# ============================================================
# WBI 签名（与 show_info.py 完全一致的实现）
# ============================================================

def get_mixin_key(raw_key: str) -> str:
    """根据混淆表生成 mixin_key"""
    return "".join(raw_key[i] for i in WBI_MIXIN_KEY_ENC_TAB)[:32]


def get_wbi_keys(sessdata: str) -> tuple:
    """
    从 B站导航接口获取 WBI 签名所需的 img_key 和 sub_key。
    注意：即使 nav API 返回 code=-101 (未登录)，wbi_img 数据仍然可用。
    """
    nav_url = "https://api.bilibili.com/x/web-interface/nav"
    headers = build_headers(sessdata)
    try:
        resp = requests.get(nav_url, headers=headers, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        # code=-101 表示未登录，但 data.wbi_img 仍然存在
        if data.get("code") not in (0, -101):
            print(f"  [警告] 获取 WBI keys 失败: code={data.get('code')}, message={data.get('message', '未知错误')}")
            return None, None
        # wbi_img = data.get("data", {}).get("wbi_img", {})
        wbi_img = data["data"]["wbi_img"]
        img_url = wbi_img["img_url"]
        sub_url = wbi_img["sub_url"]
        if not img_url or not sub_url:
            print("  [警告] WBI keys URL 为空")
            return None, None
        # 从 URL 中提取文件名作为 key（与 show_info.py 一致）
        img_key = img_url.rsplit("/", 1)[1].split(".")[0]
        sub_key = sub_url.rsplit("/", 1)[1].split(".")[0]
        return img_key, sub_key
    except Exception as e:
        print(f"  [警告] 获取 WBI keys 异常: {e}")
        return None, None


def sign_wbi(params: dict, img_key: str, sub_key: str) -> dict:
    """
    对请求参数进行 WBI 签名。
    关键：必须使用默认的 quote_plus 编码，并移除 !'()* 特殊字符，
    否则签名校验失败会被 WAF 拦截返回 412。
    """
    mixin_key = get_mixin_key(img_key + sub_key)
    wts = int(time.time())
    params["wts"] = wts
    # 使用默认的 urlencode（即 quote_plus），与 B站前端一致
    query = urllib.parse.urlencode(sorted(params.items()))
    # 关键步骤：移除 !'()* 特殊字符，与 B站前端 WBI 签名逻辑一致
    query = re.sub(r"[!'()*]", "", query)
    wbi_sign = hashlib.md5((query + mixin_key).encode()).hexdigest()
    params["w_rid"] = wbi_sign
    return params


# ============================================================
# 带重试的请求封装（与 show_info.py 的 request_with_retry 对齐）
# ============================================================

def request_with_retry(
    url: str,
    params: dict,
    headers: dict,
    max_retries: int = MAX_RETRIES,
) -> dict | None:
    """
    带重试的 GET 请求封装。
    自动处理：
      - HTTP 412 风控拦截 → 随机等待后重试
      - code -352 WBI 签名被拒 → 重试
      - code -799 请求频繁 → 等待后重试
      - code -509 限流 → 等待后重试
      - 网络异常 → 重试
    """
    for attempt in range(1, max_retries + 1):
        try:
            resp = requests.get(url, params=params, headers=headers, timeout=15)

            # HTTP 412 风控拦截
            if resp.status_code == 412:
                if attempt < max_retries:
                    wait = RETRY_DELAY * attempt + random.uniform(1, 3)
                    print(f"    [412风控] 等待 {wait:.1f}s 后重试 ({attempt}/{max_retries})...")
                    time.sleep(wait)
                    continue
                print(f"    [412风控] 重试 {max_retries} 次仍被拦截，建议添加 Cookie 或更换网络后重试")
                return None

            resp.raise_for_status()
            data = resp.json()
            code = data.get("code", -1)

            if code == 0:
                return data

            message = data.get("message", "未知错误")

            # WBI 签名被拒
            if code == -352:
                if attempt < max_retries:
                    wait = RETRY_DELAY * attempt + random.uniform(1, 3)
                    print(f"    [风控] code:-352，等待 {wait:.1f}s 后重试 ({attempt}/{max_retries})...")
                    time.sleep(wait)
                    continue
                print(f"    [风控] code:-352，可能需要更新 SESSDATA 或 Wbi 签名")
                return None

            # 请求过于频繁
            if code == -799 or code == -509:
                wait = RETRY_DELAY * 2 + random.uniform(2, 5)
                print(f"    [限流] code:{code}，等待 {wait:.1f}s...")
                time.sleep(wait)
                continue

            # 其他 API 业务错误
            print(f"    [错误] API code={code}, message={message}")
            if attempt < max_retries:
                wait = RETRY_DELAY * attempt
                time.sleep(wait)
                continue
            return None

        except requests.exceptions.RequestException as e:
            if attempt < max_retries:
                wait = RETRY_DELAY * attempt
                print(f"    [异常] 请求失败: {e}，等待 {wait}s 后重试...")
                time.sleep(wait)
                continue
            print(f"    [异常] 请求失败: {e}")
            return None
        except json.JSONDecodeError:
            print(f"    [错误] 返回非 JSON 数据（可能被风控拦截）")
            if attempt < max_retries:
                wait = RETRY_DELAY * attempt + random.uniform(2, 5)
                time.sleep(wait)
                continue
            return None

    return None


# ============================================================
# 日期工具
# ============================================================

def parse_date(date_str: str) -> datetime:
    """解析 YYYY-MM-DD 格式的日期字符串，返回北京时间当天的起始时刻"""
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    return dt.replace(tzinfo=TZ_SHANGHAI)


def datetime_to_timestamp(dt: datetime) -> int:
    """将 datetime 转为 Unix 时间戳（秒）"""
    return int(dt.timestamp())


# ============================================================
# 核心：获取用户投稿视频 BV 号
# ============================================================

def fetch_user_videos(
    uid: str,
    start_ts: int,
    end_ts: int,
    sessdata: str,
    use_wbi: bool = True,
    img_key: str = "",
    sub_key: str = "",
) -> list:
    """
    获取指定 UID 在 [start_ts, end_ts] 时间段内发布的所有视频的 bvid。

    参数:
        uid: B站用户 UID
        start_ts: 起始时间戳（秒）
        end_ts: 截止时间戳（秒）
        sessdata: SESSDATA Cookie 值
        use_wbi: 是否使用 WBI 签名
        img_key, sub_key: WBI 签名密钥

    返回:
        bvid 列表
    """
    headers = build_headers(sessdata)
    bvids = []
    page = 1
    total_fetched = 0
    max_pages = 5000  # 安全上限

    while page <= max_pages:
        params = {
            "mid": uid,
            "ps": PAGE_SIZE,
            "pn": page,
            "order": "pubdate",
        }

        # 签名
        if use_wbi and img_key and sub_key:
            params = sign_wbi(params, img_key, sub_key)
            api_url = "https://api.bilibili.com/x/space/wbi/arc/search"
        else:
            api_url = "https://api.bilibili.com/x/space/arc/search"

        result = request_with_retry(api_url, params, headers)
        if result is None:
            print(f"    \033[1;31mUID={uid} 第 {page} 页获取失败，停止翻页\033[0m")

            # 失败UID保存
            with open(DEFAULT_FAIL_UID_PATH, 'a') as ff:
                ff.write(uid + '\n')
            
            break

        data = result.get("data", {})
        page_data = data.get("list", {})
        vlist = page_data.get("vlist", [])

        if not vlist:
            break

        for video in vlist:
            created = video.get("created", 0)
            bvid = video.get("bvid", "")
            title = video.get("title", "")
            author = video.get("author", "")

            # 按发布时间降序，早于 start_ts 则后续更早，无需继续
            if created < start_ts:
                print(f"    UID={uid} 已到达时间下限，停止翻页 (共获取 {total_fetched} 条)")
                return bvids

            if created <= end_ts:
                bvids.append(bvid)
                pub_time = datetime.fromtimestamp(created, tz=TZ_SHANGHAI).strftime("%Y-%m-%d %H:%M:%S")
                total_fetched += 1
                print(f"    \033[0;32m+ {bvid} | {pub_time} | {title} | {author}\033[0m")

        # 检查是否还有下一页
        page_info = data.get("page", {})
        total_count = page_info.get("count", 0)
        current_pn = page_info.get("pn", page)

        if current_pn * PAGE_SIZE >= total_count:
            break

        page += 1
        # 带随机抖动的间隔，避免固定频率被识别为机器人
        delay = REQUEST_INTERVAL + random.uniform(0.05, 0.2)
        time.sleep(delay)

    return bvids


# ============================================================
# 主流程
# ============================================================

def load_uids(filepath: str) -> list:
    """从文件读取 UID 列表，忽略空行和注释行（#开头）"""
    if not os.path.isfile(filepath):
        print(f"错误: UID 列表文件 '{filepath}' 不存在！")
        print(f"请创建 '{filepath}' 文件，每行填写一个 B站 UID。")
        sys.exit(1)

    uids = []
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            # 支持行内注释
            uid = line.split("#")[0].strip()
            if uid and uid.isdigit():
                uids.append(uid)
            elif uid:
                print(f"  [警告] 忽略无效 UID: '{uid}'")

    return uids


def save_results(bvids: list, filepath: str):
    """将去重后的 bvid 列表保存到文件"""
    with open(filepath, "w", encoding="utf-8") as f:
        for bvid in bvids:
            f.write(bvid + "\n")
    print(f"\n结果已保存至: {filepath}")
    print(f"共 {len(bvids)} 个去重 BV 号")


def main():
    parser = argparse.ArgumentParser(
        description="爬取B站用户在特定时间段内发布视频的 BV 号",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  # 获取 2025 年全年的视频
  python get_bv.py --start 2025-01-01 --end 2025-12-31

  # 获取 2025 年 1 月到 3 月的视频，带 Cookie 提高请求权重
  python get_bv.py --start 2025-01-01 --end 2025-03-31 --cookie "your_sessdata_here"

  # 指定 UID 文件和输出文件
  python get_bv.py --start 2025-01-01 --end 2025-12-31 --uid-file my_uids.txt --output my_bvids.txt
        """,
    )
    parser.add_argument(
        "--start", type=str, required=True,
        help="起始日期，格式 YYYY-MM-DD（包含该天）",
    )
    parser.add_argument(
        "--end", type=str, required=True,
        help="截止日期，格式 YYYY-MM-DD（包含该天）",
    )
    parser.add_argument(
        "--cookie", type=str, default=SESSDATA,
        help="B站 SESSDATA 值（从浏览器 Cookie 中获取），可避免风控",
    )
    parser.add_argument(
        "--uid-file", type=str, default=UIDLIST_FILE,
        help=f"UID 列表文件路径（默认: {UIDLIST_FILE}）",
    )
    parser.add_argument(
        "--output", type=str, default=OUTPUT_FILE,
        help=f"输出文件路径（默认: {OUTPUT_FILE}）",
    )
    parser.add_argument(
        "--no-wbi", action="store_true",
        help="禁用 WBI 签名（不推荐）",
    )

    args = parser.parse_args()

    # 解析日期
    try:
        start_dt = parse_date(args.start)
        end_dt = parse_date(args.end)
    except ValueError:
        print("错误: 日期格式不正确，请使用 YYYY-MM-DD 格式")
        sys.exit(1)

    if start_dt > end_dt:
        print("错误: 起始日期不能晚于截止日期")
        sys.exit(1)

    # 截止日期设为当天 23:59:59
    end_dt = end_dt.replace(hour=23, minute=59, second=59)

    start_ts = datetime_to_timestamp(start_dt)
    end_ts = datetime_to_timestamp(end_dt)

    print("=" * 60)
    print("  B站用户视频 BV 号采集工具")
    print("=" * 60)
    print(f"  时间范围: {args.start} ~ {args.end}")
    print(f"  UID 文件: {args.uid_file}")
    print(f"  输出文件: {args.output}")
    print("=" * 60)

    # 读取 UID 列表
    uids = load_uids(args.uid_file)
    read_uids = load_uids(DEFAULT_READ_UID_PATH)

    if not uids:
        print("错误: UID 列表为空，请检查文件内容")
        sys.exit(1)

    print(f"\n共读取到 {len(uids)} 个 UID")
    for i, uid in enumerate(uids, 1):
        print(f"  [{i}] {uid}")

    # 获取 SESSDATA
    sessdata = args.cookie.strip() if args.cookie else ""
    if not sessdata:
        print("\n[警告] 未配置 SESSDATA，部分接口可能返回风控错误 (-352 / 412)")
        print("       建议通过 --cookie 参数传入 SESSDATA")

    # 获取 WBI 签名密钥
    img_key, sub_key = None, None
    use_wbi = False
    if not args.no_wbi:
        print("\n正在获取 WBI 签名密钥...")
        img_key, sub_key = get_wbi_keys(sessdata)
        if img_key and sub_key:
            use_wbi = True
            print(f"  \033[1;32mWBI 签名密钥获取成功: img_key={img_key[:8]}..., sub_key={sub_key[:8]}...\033[0m")
        else:
            print("  \033[1;33mWBI 签名密钥获取失败，将使用普通接口（可能受限）\033[0m")

    # 逐个 UID 获取视频
    all_bvids = []

    for idx, uid in enumerate(uids, 1):
        if uid in read_uids:
            print(f"\033[33mUID={uid} 已读取，跳过...\033[0m")
            continue

        print(f"\n\033[34m[{idx}/{len(uids)}] ({(idx/len(uids)*100):.2f}%)\033[0m 正在获取 UID={uid} 的投稿视频...")
        bvids = fetch_user_videos(
            uid,
            start_ts=start_ts,
            end_ts=end_ts,
            sessdata=sessdata,
            use_wbi=use_wbi,
            img_key=img_key or "",
            sub_key=sub_key or "",
        )
        all_bvids.extend(bvids)

        # 保存读取bvid
        for bvid in bvids:
            with open(DEFAULT_BVID_PATH, 'a') as ff:
                ff.write(bvid + '\n')

        # 保存已读取的UID
        with open(DEFAULT_READ_UID_PATH, 'a') as fff:
            fff.write(uid + '\n')


        print(f"  UID={uid} 获取到 {len(bvids)} 个 BV 号")

        # UID 间稍作等待（带随机抖动）
        if idx < len(uids):
            delay = 1 + random.uniform(0.2, 0.5)
            time.sleep(delay)

    # 去重（保持原始顺序）
    seen = set()
    unique_bvids = []
    for bvid in all_bvids:
        if bvid not in seen:
            seen.add(bvid)
            unique_bvids.append(bvid)

    # 输出结果
    total_before_dedup = len(all_bvids)
    total_after_dedup = len(unique_bvids)
    duplicates = total_before_dedup - total_after_dedup

    print("\n" + "=" * 60)
    print("  采集完成")
    print("=" * 60)
    print(f"  总计获取:   {total_before_dedup} 条 BV 号")
    print(f"  去重后:     {total_after_dedup} 个唯一 BV 号")
    print(f"  重复数:     {duplicates} 条")
    print("=" * 60)

    # 保存到文件
    save_results(unique_bvids, args.output)

    # 同时在控制台打印所有去重后的 BV 号
    if unique_bvids:
        print(f"\n去重后的 BV 号列表:")
        for bvid in unique_bvids:
            print(f"  {bvid}")


if __name__ == "__main__":
    main()
