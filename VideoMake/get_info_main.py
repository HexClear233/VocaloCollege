#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# 字段：
# （仅“是否快闪”字段为0.0的实行）
# export interface CardData {
#   uploader: string;（UP主）
#   clubname: string;（暂且写为UP主名）
#   clubiconPath: string;（暂时留空）
#   category: string;（标注分类）
#   typeIndex: string;（暂时留空）
#   title: string;（视频标题）
#   vocal: string;（暂时留空）
#   vocalColor: string;（暂时留空）
#   musicStaff: string;（暂时留空）
#   visualStaff: string;（暂时留空）
#   time: string;（对应csv 转换时间，最终输出为20XX-XX-XX形式）
#   bvid: string;
#   notes: string;（暂时留空）
#   timestampStart: number;（暂时留空）
#   timestampEnd: number;（暂时留空）
#   videoPath: string;（暂时记为./{bvid}.mp4）
# }

import argparse
import csv
import datetime
import os
import sys

DEFAULT_CSV_PATH = os.path.join('public', 'AllTest_2026-1', 'resource.csv')

CARD_FIELDS = [
    '标题',
    'up主',
    '转换时间',
    'bvid',
    '是否快闪',
    '标注分类',
    '分类',
    'PJSK相关',
]


def normalize_text(value):
    return (value or '').strip()


def normalize_date(value):
    date_text = normalize_text(value)
    if not date_text:
        return ''

    for fmt in ('%Y-%m-%d', '%Y/%m/%d', '%Y-%m-%d %H:%M:%S', '%Y/%m/%d %H:%M:%S'):
        try:
            return datetime.datetime.strptime(date_text, fmt).date().isoformat()
        except ValueError:
            continue

    try:
        return datetime.datetime.fromisoformat(date_text).date().isoformat()
    except ValueError:
        return date_text


def is_main_row(row):
    value = normalize_text(row.get('是否快闪'))
    return value in {'0', '0.0', '否', 'False', 'false', ''}


def derive_category(row):
    category = normalize_text(row.get('标注分类'))
    if category:
        return category

    raw_category = normalize_text(row.get('分类'))
    pJsk_value = normalize_text(row.get('PJSK相关'))
    if raw_category == '3' and pJsk_value in {'1', '1.0', '是', 'True', 'true'}:
        return '[DW/PJSK]'
    if raw_category == '0' or raw_category == '':
        return '[DW]'
    if raw_category == '1':
        return '[PJSK]'
    return f'[{raw_category}]' if raw_category else '[DW]'


def build_card_data(row):
    title = normalize_text(row.get('标题'))
    bvid = normalize_text(row.get('bvid'))
    category = derive_category(row)
    return {
        'uploader': normalize_text(row.get('up主')),
        'clubname': normalize_text(row.get('up主')),
        'clubiconPath': '',
        'category': category,
        'typeIndex': '',
        'title': title,
        'vocal': '',
        'vocalColor': '',
        'musicStaff': '',
        'visualStaff': '',
        'time': normalize_date(row.get('转换时间')),
        'bvid': bvid,
        'notes': '',
        'timestampStart': 0,
        'timestampEnd': 0,
        'videoPath': f'{bvid}.mp4' if bvid else '',
    }


def categorize_card(card):
    category = card['category']
    if 'VC' in category or 'IC' in category:
        return 'vc_ic'
    if 'OC' in category:
        return 'oc'
    if 'RT' in category and 'VC' not in category:
        return 'rt'
    return None


def read_csv_rows(csv_path):
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f'CSV 文件不存在: {csv_path}')

    with open(csv_path, 'r', encoding='utf-8-sig', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        if not reader.fieldnames:
            raise ValueError('CSV 文件没有表头')

        missing = [field for field in CARD_FIELDS if field not in reader.fieldnames]
        if missing:
            print(f'警告：CSV 表头缺少字段，继续读取已存在字段：{missing}', file=sys.stderr)

        for row in reader:
            yield row


def collect_cards(csv_path):
    oc_cards = []
    rt_cards = []
    vc_ic_cards = []

    for row in read_csv_rows(csv_path):
        if not is_main_row(row):
            continue
        card = build_card_data(row)
        if not card['title'] or not card['bvid']:
            continue

        group = categorize_card(card)
        if group == 'oc':
            oc_cards.append(card)
        elif group == 'rt':
            rt_cards.append(card)
        elif group == 'vc_ic':
            vc_ic_cards.append(card)

    return oc_cards, rt_cards, vc_ic_cards


def ts_escape(value):
    return value.replace('\\', '\\\\').replace('"', '\\"')


def format_ts_array(name, items):
    lines = [f'export const {name}: CardData[] = [']
    for item in items:
        lines.append('  {')
        for key in [
            'uploader',
            'clubname',
            'clubiconPath',
            'category',
            'typeIndex',
            'title',
            'vocal',
            'vocalColor',
            'musicStaff',
            'visualStaff',
            'time',
            'bvid',
            'notes',
            'timestampStart',
            'timestampEnd',
            'videoPath',
        ]:
            value = item[key]
            if isinstance(value, str):
                lines.append(f'    {key}: "{ts_escape(value)}",')
            else:
                lines.append(f'    {key}: {value},')
        lines.append('  },')
    lines.append(']')
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description='从 CSV 提取 CardData，并按 OC / RT / VC_IC 分组输出 TS 片段。')
    parser.add_argument('--csv', default=DEFAULT_CSV_PATH, help='输入 CSV 文件路径，默认为 public/AllTest_2026-1/resource.csv')
    parser.add_argument('--out', help='可选：输出文件路径，默认打印到控制台')
    args = parser.parse_args()

    oc_cards, rt_cards, vc_ic_cards = collect_cards(args.csv)

    if not any((oc_cards, rt_cards, vc_ic_cards)):
        print('未找到符合条件的 CardData。')
        return

    output = []
    output.append(format_ts_array('OC_CARD_DATA', oc_cards))
    output.append('')
    output.append(format_ts_array('RT_CARD_DATA', rt_cards))
    output.append('')
    output.append(format_ts_array('VC_IC_CARD_DATA', vc_ic_cards))

    ts_text = '\n\n'.join(output)

    if args.out:
        with open(args.out, 'w', encoding='utf-8') as f:
            f.write(ts_text)
        print(f'已生成 TS 数据片段并写入: {args.out}')
    else:
        print(ts_text)


if __name__ == '__main__':
    main()
