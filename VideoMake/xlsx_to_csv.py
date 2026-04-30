# xlsx表头：标题	up主	转换时间	视频简介	标签	bvid	分类	PJSK相关	是否快闪

import pandas as pd
import os

xlsx_path = 'public/AllTest_2026-1/20251001-20260301_vaild.xlsx'
csv_path = 'public/AllTest_2026-1/resource.csv'

def xlsx_to_csv(xlsx_file, csv_file):
    """
    将XLSX文件转换为CSV文件
    """
    if not os.path.exists(xlsx_file):
        print(f"错误：XLSX文件 '{xlsx_file}' 不存在。")
        return
    
    try:
        # 读取XLSX文件
        df = pd.read_excel(xlsx_file)
        
        # 保存为CSV文件，不包含索引
        df.to_csv(csv_file, index=False, encoding='utf-8-sig')
        
        print(f"成功将 '{xlsx_file}' 转换为 '{csv_file}'")
    except Exception as e:
        print(f"转换过程中出错：{e}")

if __name__ == "__main__":
    xlsx_to_csv(xlsx_path, csv_path)