export interface CardData {
  uploader: string;
  clubname: string;
  clubiconPath: string;
  category: string;
  typeIndex: string;
  title: string;
  vocal: string;
  vocalColor: string;
  musicStaff: string;
  visualStaff: string;
  time: string;
  bvid: string;
  notes: string;
  timestampStart: number;
  timestampEnd: number;
  videoPath: string;
}

export interface FlashData {
  title: string,
	category: string,
  uploader: string,
	time: string,
	bvid: string,
}

export interface LinkText {
  text: string,
  is_underlined: boolean
}

export const VIDEO_DATA: CardData[] = [
  {
    uploader: "洛天依P",
    clubname: "中术大学",
    clubiconPath: "1.webp",
    category: "[OC]",
    typeIndex: "1 / 5 [OC]",
    title: "2026年了，还有人愿意听这样的民国风原创歌曲吗？【洛天依、乐正绫】乡·水·忆｜“乡水一如初见”【南北组】【“梦光之约”新春歌会单品】",
    vocal: "洛天依ACE 乐正绫ACE",
    vocalColor: "#8190dc",
    musicStaff: "溯星P，三叁九玖awa，鬼面P，linkfqy，洛天依P",
    visualStaff: "陌玖XG，穗月黎花",
    time: "2026-02-20",
    bvid: "BV1S5fgBfEZY",
    notes: "首先，中术大学是很强的中术创作社团，再加上鬼面P的调教和其他协助，其数据和质量，个人认为，近似于，甚至超越于《丹心落》（2025Vol.1 V7）。",
    timestampStart: 0,
    timestampEnd: 83,
    videoPath: "BV1S5fgBfEZY_1.mp4", // 放在 public 文件夹
  },
  {
    uploader: "南时薰official",
    clubname: "南风动漫社",
    clubiconPath: "2.webp",
    category: "[OC]",
    typeIndex: "[SPECIAL PICK]",
    title: "【南时薰原创】薰风来时【午时华岁~2026三校联合拜年祭单品】",
    vocal: "南时薰 ACE",
    vocalColor: "#8190dc",
    musicStaff: "IronQ，绿绿，小榭又清发",
    visualStaff: "星子，浮铃幽幽子",
    time: "2026-02-21",
    bvid: "BV1q9fjB4EfN",
    notes: ">>> 南风动漫社依旧多社联合出品拜年祭。这是其中的单品之一，由南风动漫社出品。值得注意的是，虚拟歌手声库“南时薰”由社团自行制作。",
    timestampStart: 0,
    timestampEnd: 94,
    videoPath: "BV1q9fjB4EfN.mp4", // 放在 public 文件夹
  }
];

export const FLASH_DATA: FlashData[] = [
  {
		title: "【檐枫VOCALOID组教学组会】【回放】浅谈基于Synthesizer V的虚拟歌姬调教_2026-01-21",
		category: "[DW]",
		uploader: "枫韵社",
		time: "2026-01-22",
		bvid: "BV1qUzpBxEva",
	},
	{
		title: "【檐枫VOCALOID组教学组会】【回放】VOCALOID音乐创作入门导论_2025-10-12",
		category: "[DW]",
		uploader: "枫韵社",
		time: "2025-10-13",
		bvid: "BV1Tv4GzwEwM",
	},
	{
		title: "【檐枫VOCALOID组教学组会】【回放】面向扒谱的实用基础乐理_2025-11-30",
		category: "[DW]",
		uploader: "枫韵社",
		time: "2025-12-06",
		bvid: "BV16j29BPEvg",
	},
	{
		title: "XXX",
		category: "[DW/PJSK]",
		uploader: "YYY",
		time: "AAA",
		bvid: "BV1Tv4GzwEwM",
	},
]

export const videoVersionData: {[key: string]: string} = {
  year: "2026",
  version: "Vol.1",
  collectTime: "2025-10-01 0:00 ~ 2026-03-01 0:00",
  collectClubNum: "178",
  collectVideoNum: "564",
  chap2Time: "XX:XX",
  chap3Time: "XX:XX",
  chap4Time: "XX:XX",
  spTime: "XX:XX",
  description: "TestDescription",
  introBackmusic: "《星愿之音》（2025年刊 2025Vol.1 A1）"
};

/* 常量时间参数 */

export const Outro = 1620;
export const Intro = 1830;
export const ChapterLink = 210;


/* 常量视频参数 */
export const videoWidth = 1920;
export const videoHeight = 1080;
export const bottomNoteLineHeight = 1.5;