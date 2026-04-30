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

// export const FLASH_DATA: FlashData[] = [
//   {
// 		title: "【檐枫VOCALOID组教学组会】【回放】浅谈基于Synthesizer V的虚拟歌姬调教_2026-01-21",
// 		category: "[DW]",
// 		uploader: "枫韵社",
// 		time: "2026-01-22",
// 		bvid: "BV1qUzpBxEva",
// 	},
// 	{
// 		title: "【檐枫VOCALOID组教学组会】【回放】VOCALOID音乐创作入门导论_2025-10-12",
// 		category: "[DW]",
// 		uploader: "枫韵社",
// 		time: "2025-10-13",
// 		bvid: "BV1Tv4GzwEwM",
// 	},
// 	{
// 		title: "【檐枫VOCALOID组教学组会】【回放】面向扒谱的实用基础乐理_2025-11-30",
// 		category: "[DW]",
// 		uploader: "枫韵社",
// 		time: "2025-12-06",
// 		bvid: "BV16j29BPEvg",
// 	},
// 	{
// 		title: "XXX",
// 		category: "[DW/PJSK]",
// 		uploader: "YYY",
// 		time: "AAA",
// 		bvid: "BV1Tv4GzwEwM",
// 	},
// ]

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
    title: "【VOCALOID原创专辑】《页间曲》试听PV【星韵社】",
    category: "[DW]",
    uploader: "星韵社",
    time: "2025-10-10",
    bvid: "BV14H47zjEin",
  },
  {
    title: "【徵羽摩柯七周年】柯目七：唠唠柯【LV7：循风轻旅】",
    category: "[OC]",
    uploader: "洛天依P",
    time: "2025-12-10",
    bvid: "BV14n2XBkEM7",
  },
  {
    title: "【重音テト】有你的江湖【Synthesizer V cover】",
    category: "[RT]",
    uploader: "竹川ホタル",
    time: "2026-02-20",
    bvid: "BV14Nf3BREHr",
  },
  {
    title: "【夏语遥】马赛克卷er【Synthesizer V cover】",
    category: "[RT]",
    uploader: "竹川ホタル",
    time: "2026-02-20",
    bvid: "BV14Pf3BxEoT",
  },
  {
    title: "【午时华岁~2026三校联合拜年祭单品】夜行少女（南时薰cover）",
    category: "[RT]",
    uploader: "绿_Midori",
    time: "2026-02-20",
    bvid: "BV1cdf3BDEXF",
  },
  {
    title: "【洛天依原创】佐梦星澜 “具象一场 星和月闪耀的梦想”【佐佑2026拜年纪单品】",
    category: "[OC]",
    uploader: "佐佑动漫社",
    time: "2026-02-21",
    bvid: "BV1K3ZTBGEmc",
  },
  {
    title: "【洛天依原创】如果世界在明天会毁灭",
    category: "[OC]",
    uploader: "ILLISH",
    time: "2026-02-16",
    bvid: "BV1kUFezmEF7",
  },
  {
    title: "术力口",
    category: "[RT]",
    uploader: "某次元动漫社",
    time: "2026-01-09",
    bvid: "BV1LqrKB2Epz",
  },
  {
    title: "⌈Sech0乐队⌋少女レイ（少女Rei）——⛓️‍💥永远破碎的同款钥匙圈🚋",
    category: "[VC]",
    uploader: "Sech0_Official",
    time: "2026-01-27",
    bvid: "BV1AKzbBJE36",
  },
  {
    title: "【西农YUI动漫社】勾指起誓-术群群友",
    category: "[VC]",
    uploader: "西农YUI动漫社",
    time: "2025-12-31",
    bvid: "BV1BSiPBwEsW",
  },
  {
    title: "⌈Sech0乐队⌋弱虫モンブラン（胆小鬼蒙布朗）乐队cover——沉溺甜味的胆小鬼之歌",
    category: "[VC]",
    uploader: "Sech0_Official",
    time: "2026-01-16",
    bvid: "BV1C5rfBGEU3",
  },
  {
    title: "【2026YUI动漫社新春拜年祭单品】Blessing各唱各挑战",
    category: "[VC/RT]",
    uploader: "西农YUI动漫社",
    time: "2026-02-20",
    bvid: "BV1MnZiBZE9z",
  },
  {
    title: "【Sonny Youth乐队】相互取笑后说再见吧---シャルル (cover）",
    category: "[VC]",
    uploader: "东北ACG音乐联合企划",
    time: "2026-01-06",
    bvid: "BV1pRiZBtEJE",
  },
  {
    title: "⌈Sech0乐队⌋夜明けと蛍——苍蓝之色 黎明与萤光",
    category: "[VC]",
    uploader: "Sech0_Official",
    time: "2025-12-23",
    bvid: "BV1r7B4BgEuo",
  },
  {
    title: "⌈Sech0乐队⌋抜錨（起航）——总有一天 将那红线斩断➿",
    category: "[VC]",
    uploader: "Sech0_Official",
    time: "2026-01-01",
    bvid: "BV1WJiTBJEX9",
  },
  {
    title: "【宅舞＋舞狮!?】东大跨晚超燃年味舞台《扬旗鸣鼓》！",
    category: "[DW]",
    uploader: "异度沸腾动漫俱乐部",
    time: "2026-01-04",
    bvid: "BV11LizBGEHv",
  },
  {
    title: "【プロセカ/pjsk】シャンティ （SHANTI）",
    category: "[DW/PJSK]",
    uploader: "木兆Moo",
    time: "2025-11-07",
    bvid: "BV11C11BSEaR",
  },
  {
    title: "【PJSK】Mr.Showtime 向着那宛如抓不住，触不及的祈愿星✨，架起一副梯子，是时候攀登了，梦想家们！",
    category: "[DW/PJSK]",
    uploader: "FZU团子动漫社",
    time: "2025-12-27",
    bvid: "BV14QB6BWEY5",
  },
  {
    title: "【南风宅舞团】宅舞接力-*ੈ神的随波逐流.₊⊹【午时华岁~2026三校联合拜年祭单品】",
    category: "[DW]",
    uploader: "412将将",
    time: "2026-02-22",
    bvid: "BV13PfPBVEBM",
  },
  {
    title: "【咴&樱】那个夏日已然饱和【人大临界2025迎新】",
    category: "[DW]",
    uploader: "梦月若樱",
    time: "2025-11-01",
    bvid: "BV13ryeBbE4t",
  },
  {
    title: "【WOTA艺】君の神様になりたい。【2025深蓝动漫届爬台】",
    category: "[DW]",
    uploader: "DarkBlue深蓝动漫社",
    time: "2025-12-30",
    bvid: "BV15dv8BcE8F",
  },
  {
    title: "【西农YUI动漫社】混沌布吉-星子",
    category: "[DW]",
    uploader: "西农YUI动漫社",
    time: "2025-10-23",
    bvid: "BV1AJshzMENc",
  },
  {
    title: "【DK动漫社】《快乐合成器》新春线上接力！！祝大家新年快乐呀！",
    category: "[DW]",
    uploader: "Dk动漫社",
    time: "2026-02-17",
    bvid: "BV1aoZKBDEV8",
  },
  {
    title: "more jump more",
    category: "[DW/PJSK]",
    uploader: "青鸟动漫社-三年Z班",
    time: "2025-11-16",
    bvid: "BV16UCQBXErc",
  },
  {
    title: "2025神寂宅舞小分队——《猛毒》",
    category: "[DW]",
    uploader: "极地娘的回忆录",
    time: "2025-12-13",
    bvid: "BV1BVmZB1ESE",
  },
  {
    title: "百变39...",
    category: "[DW]",
    uploader: "新空动漫社空空娘",
    time: "2025-12-08",
    bvid: "BV1co2kBMEne",
  },
  {
    title: "【武大漫协迎新晚会】弱虫モンブラン （Reloaded）",
    category: "[DW]",
    uploader: "武汉大学动漫协会",
    time: "2025-10-08",
    bvid: "BV1DfnvzHET8",
  },
  {
    title: "【直播回放】MORE JUMP MORE!【CG动漫协会暮岁纪】",
    category: "[DW/PJSK]",
    uploader: "CG动漫协会",
    time: "2026-01-21",
    bvid: "BV17wzEBGEcb",
  },
  {
    title: "【礼帽×鱼安】小小的我|身高差最还原的一集~",
    category: "[DW]",
    uploader: "礼帽礼帽礼帽",
    time: "2025-12-14",
    bvid: "BV1dnm2B3EXs",
  },
  {
    title: "【2025浩天动漫盛典/宅舞】苦巧克力装饰+虚无小姐",
    category: "[DW/PJSK]",
    uploader: "浩天漫研社",
    time: "2025-12-07",
    bvid: "BV1BqmwBQEjc",
  },
  {
    title: "2025神寂宅舞小分队——《Mr.showtime》",
    category: "[DW/PJSK]",
    uploader: "极地娘的回忆录",
    time: "2025-12-13",
    bvid: "BV1BVmZB1EUZ",
  },
  {
    title: "【彩翼动漫协会】★2026元旦快闪★ Chocolate Box\可以收到你的巧克力吗",
    category: "[DW]",
    uploader: "广科彩翼动漫协会",
    time: "2026-01-01",
    bvid: "BV1DRvUBkE2g",
  },
  {
    title: "起猛了在人大看到c社六子了？文艺复兴的❀⊹千本樱⊹❀【临界2025迎新】",
    category: "[DW]",
    uploader: "西苔潘",
    time: "2025-10-28",
    bvid: "BV1dtsSzCE5Q",
  },
  {
    title: "【wota艺】猛独が襲う 东西应援团 2025年末企划",
    category: "[DW]",
    uploader: "中南大东西动漫社",
    time: "2025-12-31",
    bvid: "BV1fViMBGE4s",
  },
  {
    title: "【首师大春日诸白】第26届IJOY×CGF北京国际动漫游戏狂欢节2025年度冠军总决赛 原创填词翻唱 请不要让我的恋情变为悲剧的朱丽叶",
    category: "[DW]",
    uploader: "春日诸白动漫社",
    time: "2026-01-03",
    bvid: "BV1gqivBrEzZ",
  },
  {
    title: "【PJSK】混沌ブギ /混沌布吉“纯情？什么东西  爱情？什么玩意 那好吃吗？我说  那些好吃吗？ 问你呢 ”",
    category: "[DW/PJSK]",
    uploader: "FZU团子动漫社",
    time: "2025-12-01",
    bvid: "BV1DwSyBYE4i",
  },
  {
    title: "【星空音乐会】视奸-南木",
    category: "[DW]",
    uploader: "西农YUI动漫社",
    time: "2025-11-19",
    bvid: "BV1Juy5BUEWY",
  },
  {
    title: "【2025校内漫展】庐州太太|25时、四名忧郁女孩和一位东京雨姐情热中",
    category: "[DW/PJSK]",
    uploader: "Haruuuou",
    time: "2025-12-06",
    bvid: "BV1FY2tBtEjN",
  },
  {
    title: "【积木之森】南大dm晚会上的Mr.showtime",
    category: "[DW/PJSK]",
    uploader: "积木之森动漫社",
    time: "2025-12-25",
    bvid: "BV1g7BUBSExv",
  },
  {
    title: "【WOTA艺/七草界隈】雪がとける前に【2025七草冬日祭单品】",
    category: "[DW]",
    uploader: "华东师大七草动漫协会",
    time: "2026-01-02",
    bvid: "BV1kbvZBHE49",
  },
  {
    title: "【Lollitop宅舞团】★VOCALOID竞技场★ | Dance Master舞台实录",
    category: "[DW]",
    uploader: "Lollitop宅舞团",
    time: "2026-01-11",
    bvid: "BV1KMvQBkEZu",
  },
  {
    title: "【Lollitop宅舞团】🍧遮阳伞汽水+MORE! JUMP! MORE!⭐二连跳 | Dance Master舞台实录",
    category: "[DW/PJSK]",
    uploader: "Lollitop宅舞团",
    time: "2026-01-02",
    bvid: "BV1HRvSBaEUG",
  },
  {
    title: "【浮泽漫协｜2025夏日纪】深海少女【咸猫】",
    category: "[DW]",
    uploader: "咸猫爱吃鱼",
    time: "2025-10-09",
    bvid: "BV1N6xkzjEmb",
  },
  {
    title: "【西农yui动漫社】꙳.🧨扬旗鸣鼓🧨꙳. |金鼓鸣响点燃全场",
    category: "[DW]",
    uploader: "西农YUI动漫社",
    time: "2026-01-01",
    bvid: "BV1okvUBDE6v",
  },
  {
    title: "百团也要MORE！JUMP！MORE！",
    category: "[DW/PJSK]",
    uploader: "佐佑动漫社",
    time: "2025-10-22",
    bvid: "BV1iAstzHEfz",
  },
  {
    title: "【混沌布吉十不可思议的wonderg二游】全网最尊重玛得玛得玛得的瓦斯40号（给大学迎新晚会一点瓦斯震撼）",
    category: "[DW/PJSK]",
    uploader: "杭职Phoenix动漫协会",
    time: "2025-12-13",
    bvid: "BV1jdm9BhEAK",
  },
  {
    title: "【FLY动漫社】神のまにまに跨年接力",
    category: "[DW]",
    uploader: "FLY动漫社-",
    time: "2026-02-16",
    bvid: "BV1q9ZMBhE2x",
  },
  {
    title: "【西农YUI动漫社】微笑调查队-狸子 HTT 槿栀 泠霖 空城",
    category: "[DW/PJSK]",
    uploader: "西农YUI动漫社",
    time: "2025-10-23",
    bvid: "BV1knshziEx1",
  },
  {
    title: "【安大红月动漫社】月安纪单品——狼狈不堪地夺回本属于我们的全部荣耀",
    category: "[DW/PJSK]",
    uploader: "红月动漫社",
    time: "2025-12-08",
    bvid: "BV1ME2rBLEcX",
  },
  {
    title: "【元火动漫社】2025秋季晚会ED合集",
    category: "[DW]",
    uploader: "元火originalfire",
    time: "2025-12-18",
    bvid: "BV1rdqDBqEjF",
  },
  {
    title: "午时华岁~2026三校联合拜年祭PV（南风x沸点xD-Touch）",
    category: "[DW]",
    uploader: "复旦沸点漫画社",
    time: "2026-02-19",
    bvid: "BV1toZeBsECJ",
  },
  {
    title: "【PJSK】✨⛱️来看灯光堪比演唱会的遮阳伞汽水舞台🥤✨",
    category: "[DW/PJSK]",
    uploader: "优兔_risari",
    time: "2025-11-08",
    bvid: "BV1N917BgEtq",
  },
  {
    title: "“想要回应你的期待，心却渐渐枯萎”｜《虚无さん》",
    category: "[DW/PJSK]",
    uploader: "所谓锶",
    time: "2025-11-07",
    bvid: "BV1NQ2cB8EQA",
  },
  {
    title: "【蔻饼靈】Empurple☔️雪白世界的我们染上紫色【佐佑2026拜年纪单品】",
    category: "[DW/PJSK]",
    uploader: "炸毛の月饼饼_",
    time: "2026-02-19",
    bvid: "BV1qNZSBLEiJ",
  },
  {
    title: "【PJSK元旦作/プロセカ】🎆✨新年也要Wonderhoi！🥳瓦斯来给大家拜年啦！🧧いーあるふぁんくらぶ（1 2 FanClub ）🎇✨",
    category: "[DW/PJSK]",
    uploader: "幽澜丷墨汐",
    time: "2026-01-01",
    bvid: "BV1rSiMBmEXW",
  },
  {
    title: "【直播回放】勾指起誓【CG动漫协会暮岁纪】",
    category: "[DW]",
    uploader: "CG动漫协会",
    time: "2026-01-22",
    bvid: "BV1U7zEBcE8L",
  },
  {
    title: "双倍元气暴击！遮阳伞汽水+more jump more二连跳！【元火动漫社27周年社庆单品】",
    category: "[DW/PJSK]",
    uploader: "-拓扑流形-",
    time: "2025-12-17",
    bvid: "BV1sEqVBMEd2",
  },
  {
    title: "【PJSK/プロセカ】价值十个大音符的🎃万圣企划🎃🦈ラブカ？/皱鳃鲨？🦈来袭！【cos向翻跳万圣作】",
    category: "[DW/PJSK]",
    uploader: "幽澜丷墨汐",
    time: "2025-10-31",
    bvid: "BV1Ss1TBEESG",
  },
  {
    title: "【Lollitop宅舞团】🩸v我25时 | ❣ envybaby+shadowshadow ❣ 二连跳 | Dance Master舞台实录",
    category: "[DW/PJSK]",
    uploader: "Lollitop宅舞团",
    time: "2026-01-05",
    bvid: "BV1sUvSBiEUk",
  },
  {
    title: "【PJSK圣诞作/プロセカ】✨在四位数一小时的剧院录ws是一种什么样的体验？！点击即看灯光超还原的🎄🔔灯丝狂热 / Filament Fever🎭🎶",
    category: "[DW/PJSK]",
    uploader: "幽澜丷墨汐",
    time: "2025-12-24",
    bvid: "BV1tuB7B9EeE",
  },
  {
    title: "「ロストワンの号哭.mp4」万事屋版",
    category: "[DW]",
    uploader: "贝壳动漫社",
    time: "2026-01-17",
    bvid: "BV1udrkBgEPL",
  },
  {
    title: "要相信樱云流火的话",
    category: "[DW]",
    uploader: "樱云流火动漫社",
    time: "2025-10-23",
    bvid: "BV1vbsBz5EnR",
  },
  {
    title: "【山师集英】下等马—恭贺新春",
    category: "[DW]",
    uploader: "山师集英动漫社",
    time: "2026-02-20",
    bvid: "BV1vXZ6BHEZK",
  },
  {
    title: "【幻醒旅团】デイバイデイズ(day by days)[2023ChinaJoy舞艺超群 全国舞团盛典 全国总决赛]【银殇×苜蓿】<视频补档>",
    category: "[DW]",
    uploader: "幻醒旅团",
    time: "2025-10-18",
    bvid: "BV1wbWJzBEHy",
  },
  {
    title: "【WOTA艺】九九八十一 在北京大学社团风向标上爬台",
    category: "[DW]",
    uploader: "水月Mizuki公式",
    time: "2025-12-13",
    bvid: "BV1WYmQBBEx2",
  },
  {
    title: "北师 大合成 器",
    category: "[DW]",
    uploader: "北京师范大学漫有引力动漫社",
    time: "2026-02-26",
    bvid: "BV1xLA6zLEiV",
  },
  {
    title: "【山师集英/冬宅企划】Hand in hand---❄牵起彼此的手❄",
    category: "[DW]",
    uploader: "山师集英动漫社",
    time: "2026-01-04",
    bvid: "BV1y9iqBBEQJ",
  },
  {
    title: "【安大红月动漫社】月安纪单品——赛博朋克死亡男孩",
    category: "[DW/PJSK]",
    uploader: "红月动漫社",
    time: "2025-12-08",
    bvid: "BV1TZ2rBmECW",
  },
  {
    title: "【PJSK☆ws】🎡一个学校竟然凑出了ws本人的程度？！🎠｜☆不可思议的wonders",
    category: "[DW/PJSK]",
    uploader: "优兔_risari",
    time: "2025-12-05",
    bvid: "BV1vL2LBnEQF",
  },
  {
    title: "【香菜哒咩】☆向未来伸出手吧☆リアライズ(Realize)",
    category: "[DW/PJSK]",
    uploader: "星骑动漫社",
    time: "2026-01-30",
    bvid: "BV1zF6BBMEr7",
  },
];


export const videoVersionData: { [key: string]: string } = {
  year: "2026",
  version: "Vol.1",
  collectTime: "2025-10-01 0:00 ~ 2026-03-01 0:00",
  collectClubNum: "178",
  collectVideoNum: "564",
  chap2Time: "06:45",
  chap3Time: "07:49",
  chap4Time: "09:02",
  spTime: "11:15",
  description: ">> [OC][RT][VC]作品占比较上期出现明显增长（2.96% -> 4.43%）。\
\n>> 出现[VC]分界模糊（[VC]内包含[RT]元素）。\
\n>> [OC][RT]出现社团自制声库。\
\n>> [DW]中Project Sekai元素出现频率增长（25.45% -> 43.64%）。\n\n>> 2个社团账号注销。（UID：15659088，248985550）",
  introBackmusic: "《星愿之音》（2025年刊 2025Vol.1 A1）"
};

export const OC_CARD_DATA: CardData[] = [
  {
    uploader: "现充爆炸乐队",
    clubname: "Shining动漫社",
    clubiconPath: "AllTest_2026-1/icons/Shining.webp",
    category: "[OC]",
    typeIndex: "1 / 4    [OC]",
    title: "【永夜原创曲】夏枯蝉雨 【现充爆炸乐队】",
    vocal: "永夜Minus SV",
    vocalColor: "#8190dc",
    musicStaff: "空连，青草墨",
    visualStaff: "水边儿",
    time: "2025-10-06",
    bvid: "BV1csHGz3E7C",
    notes: ">>> “现充爆炸乐队”为Shining动漫社的术曲主要产出之一。\
\n2025Vol.2 V3《Marionette 人形剧场终幕时》，UP同为现充爆炸乐队。",
    timestampStart: 0,
    timestampEnd: 83,
    videoPath: "AllTest_2026-1/videos/BV1csHGz3E7C.mp4",
  },
  {
    uploader: "西安高校vocaloid创作社",
    clubname: "*西安高校vocaloid创作社",
    clubiconPath: "AllTest_2026-1/icons/xian_vocalo.webp",
    category: "[OC]",
    typeIndex: "2 / 4    [OC]",
    title: "【洛天依/乐正绫原创】岁暮歌【西安高校Vocaloid联合创作会】",
    vocal: "洛天依 V 乐正绫 V",
    vocalColor: "#8190dc",
    musicStaff: "StranieroKyokune，白琳，HCl口服液",
    visualStaff: "MeRC4urY0",
    time: "2026-02-16",
    bvid: "BV1hYcgzeEFH",
    notes: ">>> 投稿界面显示，该稿件无Shining动漫社账号联合投稿。Staff也与以前不同。",
    timestampStart: 0,
    timestampEnd: 74,
    videoPath: "AllTest_2026-1/videos/BV1hYcgzeEFH.mp4",
  },
  {
    uploader: "我只笑笑不说话鸭",
    clubname: "中术大学",
    clubiconPath: "AllTest_2026-1/icons/zsdx.webp",
    category: "[OC]",
    typeIndex: "3 / 4    [OC]",
    title: "【徵羽摩柯七周年】请为我画一只绵羊【LV7：循风轻旅】",
    vocal: "徵羽摩柯 ACE",
    vocalColor: "#0080ff",
    musicStaff: "我只笑笑不说话，信弦，零舸，Joker_P",
    visualStaff: "若冰，穗月黎花",
    time: "2025-12-10",
    bvid: "BV1mtmJBQE7X",
    notes: ">>> 中术大学本期收录范围时间内依旧活跃。",
    timestampStart: 0,
    timestampEnd: 86,
    videoPath: "AllTest_2026-1/videos/BV1mtmJBQE7X.mp4",
  },
  {
    uploader: "洛天依P",
    clubname: "中术大学",
    clubiconPath: "AllTest_2026-1/icons/zsdx.webp",
    category: "[OC]",
    typeIndex: "4 / 4    [OC]",
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
    videoPath: "AllTest_2026-1/videos/BV1S5fgBfEZY.mp4",
  },
]



export const RT_CARD_DATA: CardData[] = [
  {
    uploader: "星韵社",
    clubname: "星韵社",
    clubiconPath: "AllTest_2026-1/icons/xys.webp",
    category: "[RT]",
    typeIndex: "1 / 1    [RT]",
    title: "【飞梦ACE COVER】404 NOT FOUND【飞梦ACG联萌秋季百团应援曲】",
    vocal: "飞梦 ACE",
    vocalColor: "#8190dc",
    musicStaff: "浪隐波风，陈年咸菜Jun",
    visualStaff: "*UNKNOWN",
    time: "2025-10-11",
    bvid: "BV1yc4AzYENZ",
    notes: ">>> 星韵社作为飞梦隶属术力口社团，也产出了非常多质量优秀的歌曲。",
    timestampStart: 84,
    timestampEnd: 139,
    videoPath: "AllTest_2026-1/videos/BV1yc4AzYENZ.mp4",
  },
]



export const VC_IC_CARD_DATA: CardData[] = [
  {
    uploader: "银精灵_",
    clubname: "东北ACG音乐联合企划",
    clubiconPath: "AllTest_2026-1/icons/DongBeiACG.webp",
    category: "[VC]",
    typeIndex: "1 / 2    [VC]",
    title: "我们二次元有自己的难忘今宵",
    vocal: "NULL",
    vocalColor: "white",
    musicStaff: "银精灵，宋西，月希歌，Cyber，QQQ，掉脑人，朽木，金眠，祝玥，Enki，深海鱼，节能\n\n砂糖橘，阿川，唯默，利玛窦，哈基文（夜迷乐队）\
    \n\n__ID___，绵绵狼cottensheep",
    visualStaff: "*UNKNOWN",
    time: "2026-02-16",
    bvid: "BV1WMZABoEbM",
    notes: "非常“难忘今宵”的感觉。有种high起来的意味。",
    timestampStart: 58,
    timestampEnd: 98,
    videoPath: "AllTest_2026-1/videos/BV1WMZABoEbM.mp4",
  },
  {
    uploader: "鲁东澪幻空间动漫社",
    clubname: "鲁东澪幻空间动漫社",
    clubiconPath: "AllTest_2026-1/icons/vc2.webp",
    category: "[VC]",
    typeIndex: "2 / 2    [VC]",
    title: "【澪幻空间】宅歌配音部合唱第一期《勾指起誓》",
    vocal: "NULL",
    vocalColor: "white",
    musicStaff: "维祎，陌璃，立風，糖糖，伯约，海德薇，hidden",
    visualStaff: "hidden",
    time: "2025-11-13",
    bvid: "BV1Z8CtBmE6a",
    notes: ">>> 这一期也有个合唱。（上一期有个FLY动漫社的霜雪千年，各唱各的挑战）",
    timestampStart: 44,
    timestampEnd: 67,
    videoPath: "AllTest_2026-1/videos/BV1Z8CtBmE6a.mp4",
  },
]

export const SP_CARD_DATA: CardData[] = [
  {
    uploader: "南时薰official",
    clubname: "南风动漫社",
    clubiconPath: "AllTest_2026-1/icons/Nanfeng.webp",
    category: "[OC]",
    typeIndex: "[SPECIAL PICK]",
    title: "【南时薰原创】薰风来时【午时华岁~2026三校联合拜年祭单品】",
    vocal: "南时薰",
    vocalColor: "#8190dc",
    musicStaff: "IronQ，绿绿，小榭又清发",
    visualStaff: "星子，浮铃幽幽子",
    time: "2026-02-21",
    bvid: "BV1q9fjB4EfN",
    notes: ">>> 南风动漫社依旧多社联合出品拜年祭。这是其中的单品之一，由南风动漫社出品。值得注意的是，虚拟歌手声库“南时薰”由社团自行制作。",
    timestampStart: 0,
    timestampEnd: 94,
    videoPath: "AllTest_2026-1/videos/BV1q9fjB4EfN.mp4",
  },
]

/* 常量时间参数 */

export const Outro = 1620;
export const Intro = 1830;
export const ChapterLink = 210;


/* 常量视频参数 */
export const videoWidth = 1920;
export const videoHeight = 1080;
export const bottomNoteLineHeight = 1.5;
export const backMusictitle = "*背景音乐：《モア！ジャンプ！モア！》（MMJ Inst.） 来源：Project Sekai Wiki";