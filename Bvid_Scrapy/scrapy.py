import re
import requests
from openpyxl import Workbook
import time

# 写入错误日志
def write_error_log(message):
    with open("video_errorlist.txt", "a", encoding="utf-8") as file:
        file.write(message + "\n")

# 判断输入是 URL 还是 BV号
def is_url(video_id_or_url):
    return video_id_or_url.startswith("http")

# 从 URL 或 BV号中提取 BV号
def extract_bvid(video_id_or_url):
    if is_url(video_id_or_url):
        match = re.search(r'/video/(BV\w+)', video_id_or_url)
        if match:
            return match.group(1)
        else:
            raise Exception("未能从 URL 提取 BV号")
    else:
        return video_id_or_url.strip()

# 使用 B站 API 获取视频数据
def get_video_data(bvid, headers):
    api_url = f"https://api.bilibili.com/x/web-interface/view?bvid={bvid}"
    response = requests.get(api_url, headers=headers,proxies={"http": None, "https": None})
    if response.status_code != 200:
        raise Exception(f"API请求失败，HTTP状态码: {response.status_code}")
    data = response.json()
    if data["code"] != 0:
        raise Exception(f"B站API返回错误: {data['message']}")
    return data["data"]

# 主程序
def main(file_path, mid):
    input_file = file_path
    output_file = f"./ac_xlsx/output_{mid}.xlsx"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    new_wb = Workbook()
    new_ws = new_wb.active
    new_ws.append(
        ["标题", "链接", "up主", "up主id", "精确播放数", "历史累计弹幕数", "点赞数", "投硬币枚数", "收藏人数", "转发人数",
         "发布时间戳", "视频时长(秒)", "视频简介", "标签", "视频aid", "bvid"]
    )

    with open(input_file, "r", encoding="utf-8") as file:
        id_list = file.readlines()

    for i, video_id_or_url in enumerate(id_list, start=1):
        try:
            bvid = extract_bvid(video_id_or_url.strip())
            data = get_video_data(bvid, headers)

            title = data.get("title", "")
            url = f"https://www.bilibili.com/video/{bvid}"
            author = data["owner"]["name"]
            author_id = data["owner"]["mid"]
            views = data["stat"]["view"]
            danmaku = data["stat"]["danmaku"]
            likes = data["stat"]["like"]
            coins = data["stat"]["coin"]
            favorites = data["stat"]["favorite"]
            shares = data["stat"]["share"]
            publish_date = data["pubdate"]  # 时间戳格式
            duration = data["duration"]
            desc = data.get("desc", "")
            aid = data["aid"]

            # 获取标签（需额外API）
            tag_api_url = f"https://api.bilibili.com/x/tag/archive/tags?aid={aid}"
            tag_response = requests.get(tag_api_url, headers=headers,proxies={"http": None, "https": None})
            if tag_response.status_code == 200:
                tag_data = tag_response.json()
                if tag_data["code"] == 0:
                    tags = ",".join([tag["tag_name"] for tag in tag_data["data"]])
                else:
                    tags = ""
            else:
                tags = ""

            new_ws.append([
                title, url, author, author_id, views, danmaku, likes, coins,
                favorites, shares, publish_date, duration, desc, tags, aid, bvid
            ])

            print(f"第{i}条视频 {url} 已成功爬取")
            time.sleep(0.5)  # 避免请求过快被封IP

        except Exception as e:
            error_msg = f"第{i}条视频发生错误：{e}"
            print(error_msg)
            write_error_log(f"{error_msg} | 数据: {video_id_or_url.strip()}")

    new_wb.save(output_file)
    print(f"\n全部视频处理完毕，结果保存在 {output_file}")

# 执行程序
if __name__ == "__main__":
    up_num = 15

    # with open("uidlist.txt", "r") as f:
    #     mids = [int(line.strip()) for line in f.readlines()]

    # for mid in mids:
    #     print(f"正在处理UP主 {mid} 的视频...")
    mid = 5970160
    file = f"./ac_info/idlist_{mid}.txt"
    main(file, mid)
