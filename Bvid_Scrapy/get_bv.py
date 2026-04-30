import datetime
import requests
import time
import random
from requests.adapters import HTTPAdapter
from urllib3.util.ssl_ import create_urllib3_context
import json
# -*- coding: utf-8 -*-

class SSLAdapter(HTTPAdapter):
    def init_poolmanager(self, *args, **kwargs):
        context = create_urllib3_context()
        kwargs['ssl_context'] = context
        return super().init_poolmanager(*args, **kwargs)

def get_bv_list_by_up_and_time(mid, start_time, end_time, port):
    """
    获取某个UP主在某个时间范围内的所有视频BV号
    :param mid: UP主id (int)
    :param start_time: 起始时间戳（int）
    :param end_time: 结束时间戳（int）
    :return: BV号列表
    """
    bv_list = []
    page = 1
    page_size = 30  # B站接口最大支持30
    target_video_num = 70

    user_agents = [
        "Mozilla/5.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        # 添加更多User-Agent
    ]

    headers = {"User-Agent": random.choice(user_agents)}

    # headers = {"User-Agent": "Mozilla/5.0"}

    # proxies = {"http": "http://127.0.0.1:7890", "https": "http://127.0.0.1:7890"}

    # proxies = {"http": None, "https": None}
    
    gotten_video = 0
    error_count = 0

    while True:
        url = f"https://api.bilibili.com/x/space/arc/search?mid={mid}&pn={page}&ps={page_size}&order=pubdate"
        proxies_tmp = {"http": f"http://127.0.0.1:{port}", "https": f"http://127.0.0.1:{port}"}
        response = requests.get(url, headers=headers, proxies=proxies_tmp)
        if response.status_code != 200:
            error_count += 1
            print(f"请求失败：HTTP {response.status_code}, 错误次数: {error_count}")
            break

        data = response.json()

        if data['code'] != 0:
            error_count += 1
            print(f"API错误：{data['message']}, 错误次数: {error_count}")
            time.sleep(3)
            if gotten_video < target_video_num:
                continue

        if error_count >= 100:
            print("连续错误过多，疑似被封，停止请求")
            break
        
        vlist = data['data']['list']['vlist']
        if not vlist:
            break  # 没有更多视频


        for video in vlist:
            pubdate = video['created']
            if pubdate < start_time:
                return bv_list  # 时间已超出范围，结束
            if start_time <= pubdate <= end_time:
                print(f"视频标题：{video['title']}, \tUP主: {video['author']}, \t发布时间: {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(pubdate))}")
                bv_list.append(video['bvid'])
            # bv_list.append(video['bvid'])

            # with open("response_data.json", "w", encoding="utf-8") as f:
            #     if data['code'] == 0:
            #         json.dump(data, f, ensure_ascii=False, indent=4)
            
            if len(bv_list) >= target_video_num:
                return bv_list

        page += 1
        time.sleep(2.5)  # 避免过快请求被封

    return bv_list

def write_bv_list_to_file(bv_list, uid):
    filename = f"./bvid_202602.txt"
    with open(filename, "a") as f:
        for bv in bv_list:
            f.write(bv + "\n")
    print(f"已将 {len(bv_list)} 个BV号写入文件：{filename}, UP主：{uid}")

# def write_bv_list_to_file(bv_list):
#     filename = f"./ac_info/2025-07.txt"
#     with open(filename, "a", encoding="utf-8") as f:
#         for bv in bv_list:
#             f.write(bv + "\n")
#     print(f"已将 {len(bv_list)} 个BV号写入文件：{filename}")

# print("输入UP主UID:")
# uid = int(input())
# start_time = int(input())
# end_time = int(input())

def get_bv_main():
    with open("./uidlist.txt", "r") as f:
        mids = [int(line.strip()) for line in f.readlines()]

    start_time = int(time.mktime(datetime.datetime(2025, 10, 1, 0, 0).timetuple()))
    end_time = int(time.mktime(datetime.datetime(2026, 3, 1, 0, 0).timetuple()))

    # for mid in mids:
    #     print(f"正在获取UP主 {mid} 的视频BV号...")
    #     bv_list = get_bv_list_by_up_and_time(mid, start_time, end_time)
    #     print(bv_list)
    #     write_bv_list_to_file(bv_list, mid)

    bv_list = []
    read_filename = f"./read_uidlist.txt"

    with open(read_filename, "r") as f:
        read_mids = [int(line.strip()) for line in f.readlines()]

    port = 8062

    uid_num = len(mids)
    processed_count = 1

    for mid in mids:
        if mid in read_mids:
            print(f"{processed_count} / {uid_num} \033[32m[{processed_count/uid_num*100:.2f}%]\033[0m UP主 {mid} 已经处理过，跳过...")
            processed_count += 1
            continue
        print(f"{processed_count} / {uid_num} \033[32m[{processed_count/uid_num*100:.2f}%]\033[0m\t正在获取UP主 {mid} 的视频BV号...")
        bv_list = get_bv_list_by_up_and_time(mid, start_time, end_time, port)
        print(bv_list)
        processed_count += 1

        write_bv_list_to_file(bv_list, mid)

        with open(read_filename, "a", encoding="utf-8") as f:
            f.write(str(mid) + "\n")

    # mid = 5970160
    # print(f"正在获取UP主 {mid} 的视频BV号...")
    # bv_list = get_bv_list_by_up_and_time(mid)
    # print(bv_list)
    # write_bv_list_to_file(bv_list, mid)

if __name__ == "__main__":
    get_bv_main()
    print("获取完成")