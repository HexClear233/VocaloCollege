import csv
import argparse
import datetime
import os
import sys

DEFAULT_CSV_PATH = 'public/AllTest_2026-1/resource.csv'

# 字段：
# （仅“是否快闪”字段为1.0的实行快闪）
# export interface FlashData {
#   title: string,（对应csv 标题）
#   category: string,（对应csv 标注分类，但，若csv的分类栏为3，且PJSK相关为1，则标注分类为[]）
#   uploader: string,（对应csv up主）
#   time: string,（对应csv 转换时间，最终输出为20XX-XX-XX形式）
#   bvid: string,（对应csv bvid）
# }

CSV_HAS_HEADER = True

FIELD_TITLE = '标题'
FIELD_UPLOADER = 'up主'
FIELD_CONVERT_TIME = '转换时间'
FIELD_BVID = 'bvid'
FIELD_CATEGORY = '分类'
FIELD_PJSK = 'PJSK相关'
FIELD_FLASH = '是否快闪'
FLELD_GIVEN_CATEGORY = '标注分类'


def parse_category(value: str, pJsk_value: str, given_category: str) -> str:
    value = (value or '').strip()
    pJsk_value = (pJsk_value or '').strip()

    if value == '1':
        category = given_category
    elif value == '2':
        category = given_category
    else:
        category = '[DW]'

    if pJsk_value:
        if category == '[DW]':
            category = '[DW/PJSK]'

    return category


def parse_date(value: str) -> str:
    if not value:
        return ''
    value = value.strip()
    for fmt in ('%Y-%m-%d %H:%M:%S', '%Y-%m-%d', '%Y/%m/%d %H:%M:%S', '%Y/%m/%d'):
        try:
            dt = datetime.datetime.strptime(value, fmt)
            return dt.strftime('%Y-%m-%d')
        except ValueError:
            continue
    return value


def is_flash_row(value: str) -> bool:
    if value is None:
        return False
    value = str(value).strip()
    return value in ('1', '1.0', 'True', 'true', 'TRUE')


def normalize_text(value: str) -> str:
    if value is None:
        return ''
    return str(value).strip().replace('"', '\\"')


def build_flash_item(row: dict, headers: list) -> dict:
    title = normalize_text(row.get(FIELD_TITLE, ''))
    uploader = normalize_text(row.get(FIELD_UPLOADER, ''))
    time = parse_date(row.get(FIELD_CONVERT_TIME, ''))
    bvid = normalize_text(row.get(FIELD_BVID, ''))
    category = parse_category(row.get(FIELD_CATEGORY, ''), row.get(FIELD_PJSK, ''), row.get(FLELD_GIVEN_CATEGORY, ''))

    return {
        'title': title,
        'category': category,
        'uploader': uploader,
        'time': time,
        'bvid': bvid,
    }


def read_csv_rows(csv_path: str) -> list[dict]:
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f'CSV 文件不存在: {csv_path}')

    with open(csv_path, encoding='utf-8-sig', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = [row for row in reader]
    return rows


def format_ts_array(items: list[dict]) -> str:
    lines = ['export const FLASH_DATA: FlashData[] = [']
    for item in items:
        lines.append('  {')
        lines.append(f'    title: "{item["title"]}",')
        lines.append(f'    category: "{item["category"]}",')
        lines.append(f'    uploader: "{item["uploader"]}",')
        lines.append(f'    time: "{item["time"]}",')
        lines.append(f'    bvid: "{item["bvid"]}",')
        lines.append('  },')
    lines.append('];')
    return '\n'.join(lines)


def write_output(output_path: str, content: str) -> None:
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'已写入: {output_path}')


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='从 CSV 中提取 FLASH_DATA，并生成 TS 数组')
    parser.add_argument('--csv', default=DEFAULT_CSV_PATH, help='输入 CSV 路径')
    parser.add_argument('--output', help='可选的输出 TS 文件路径')
    parser.add_argument('--preview', action='store_true', help='仅打印输出，不写文件')
    parser.add_argument('--limit', type=int, default=0, help='仅输出前 N 条快闪记录，0 表示全部')
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    try:
        rows = read_csv_rows(args.csv)
    except FileNotFoundError as exc:
        print(exc, file=sys.stderr)
        return 1

    items = []
    for row in rows:
        if is_flash_row(row.get(FIELD_FLASH, '')):
            item = build_flash_item(row, row.keys())
            if item['title'] and item['bvid']:
                items.append(item)
            else:
                print(f'警告：跳过缺少 title 或 bvid 的行: {row}', file=sys.stderr)

    if args.limit > 0:
        items = items[: args.limit]

    output = format_ts_array(items)

    if args.output:
        write_output(args.output, output)
    if args.preview or not args.output:
        print(output)

    return 0


if __name__ == '__main__':
    raise SystemExit(main())
