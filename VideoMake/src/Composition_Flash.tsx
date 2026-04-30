import React from 'react';
import {
	AbsoluteFill,
	Img,
	staticFile,
	Series,
	useVideoConfig,
	Html5Audio,
	useCurrentFrame,
	interpolate,
	Sequence,
} from 'remotion';

import { backMusictitle, FLASH_DATA } from './constants';

// --- 模拟 constants.ts 中的数据 ---
const CARD_DATA = FLASH_DATA;

const DURATION_PER_SCENE = 5 * 30; // 5秒 * 30fps

const fontStyle = `
  @font-face {
    font-family: 'SourceHanSansSC';
    src: url(${staticFile('SourceHanSansSC-Medium.otf')}) format('truetype');
  }
`;

// --- 子组件：单张卡片 ---
const FlashCard: React.FC<{ data: typeof CARD_DATA[0]; index: number }> = ({
	data,
	index,
}) => {
	const yShift = index * 312;
	const textX = 570;

	// 字体样式基础
	const textBaseStyle: React.CSSProperties = {
		position: 'absolute',
		color: 'white',
		fontFamily: 'SourceHanSansSC',
		fontSize: 32,
		textAlign: 'left',
		display: 'flex',
		alignItems: 'center',
	};

	return (
		<div style={{ position: 'absolute', top: 144 + yShift, width: '100%' }}>
			<style>{fontStyle}</style>
			{/* 1. 封面图 (等同于 MoviePy resized(1080/cover_w) 的逻辑) */}
			{/* 这里的布局根据你 Python 代码中的 cover_pos 计算逻辑简化为 Flex/Absolute */}
			<div
				style={{
					position: 'absolute',

					// 封面居中对齐
					// width: 1920, // 假设封面比例，可根据实际调整
					// height: 1080,
					transform: 'scale(0.28)', // 对应你 Python 的逻辑比例
					transformOrigin: 'left top',
				}}
			>
				<Img
					src={staticFile(`AllTest_2026-1/covers/${data.bvid}.jpg`)}
					style={{ width: 1920, height: 1080 }}
				/>
			</div>

			{/* 2. 标题行 (自动换行逻辑) */}
			<div
				style={{
					...textBaseStyle,
					left: textX,
					top: 0 + 20,
					width: 1330,
					fontSize: 36,
					lineHeight: 1.2,
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					overflow: 'visible',
				}}
			>
				{data.title}
			</div>

			{/* 3. 第二行：分类 & UP主 */}
			<div style={{ ...textBaseStyle, left: textX, top: 120, width: 300 }}>
				{data.category}
			</div>
			<div style={{ ...textBaseStyle, left: textX + 300, top: 120, width: 500 }}>
				{"UP主：" + data.uploader}
			</div>

			{/* 4. 第三行：时间 & BVID */}
			<div style={{ ...textBaseStyle, left: textX, top: 220, width: 240 }}>
				{data.time}
			</div>
			<div style={{ ...textBaseStyle, left: textX + 300, top: 220, width: 500 }}>
				{data.bvid}
			</div>
		</div>
	);
};

// --- 子组件：单幕（含3张卡片） ---
const FlashScene: React.FC<{ batch: typeof CARD_DATA }> = ({ batch }) => {
	return (
		<AbsoluteFill>
			{/* 背景层 */}
			<AbsoluteFill style={{ backgroundColor: 'black' }} />

			{/* 背景图层 (0.35 透明度 + 居中) */}
			<AbsoluteFill>
				<Img
					src={staticFile('background.jpeg')}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						opacity: 0.3,
					}}
				/>
			</AbsoluteFill>

			{/* LOGO层 */}
			<Img
				src={staticFile('logo_white_2.png')}
				style={{
					position: 'absolute',
					right: 60, // 对应 Python 3260 (3840 - 3260 左右)
					top: 60,
					width: 2838 * 0.06,
				}}
			/>
			<h5
				style={{
					color: 'white',
					fontSize: 32,
					fontFamily: 'SourceHanSansSC',
					fontStyle: 'italic',
					left: 3,
					top: 3,
				}}>
				{"背景音乐：《モア！ジャンプ！モア！》（MMJ Inst.） 来源：Project Sekai Wiki"}
			</h5>

			{/* 卡片列表 */}
			{batch.map((item, i) => (
				<FlashCard key={item.bvid} data={item} index={i} />
			))}
		</AbsoluteFill>
	);
};

const AudioWithFade = ({ durationInFrames }) => {
	const frame = useCurrentFrame();

	// 设置淡出持续时间（例如 30 帧）
	const fadeDuration = 30;

	// 计算音量：从 (总长度 - 淡出长度) 开始到 总长度，音量从 1 变为 0
	const volume = interpolate(
		frame,
		[durationInFrames - fadeDuration, durationInFrames],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<Html5Audio
			src={staticFile("AllTest_2026-1/MJM.ogg")}
			volume={volume} // 将动态计算的音量应用到组件
			trimBefore={0}
			trimAfter={durationInFrames}
		/>
	);
};

const BackMusicShow = ({ }) => {
	return (
		<div
			style={{
				position: 'absolute',
				left: 3,
				top: 3,
				color: 'white',
				fontSize: 32,
				fontFamily: 'SourceHanSansSC',
				fontStyle: 'italic',
				zIndex: 10,
			}}>
			{backMusictitle}
		</div>
	);
};

// --- 主入口组件 ---
export const MainScene_Flash: React.FC = () => {
	// 将数据按 3 个一组切分 (sliced_data)
	const slicedData = [];
	for (let i = 0; i < CARD_DATA.length; i += 3) {
		slicedData.push(CARD_DATA.slice(i, i + 3));
	}

	return (
		<AbsoluteFill>
			<AudioWithFade durationInFrames={Math.ceil(FLASH_DATA.length / 3) * (5 * 30)} />

			<Series>
				{slicedData.map((batch, index) => (
					<Series.Sequence
						key={index}
						durationInFrames={DURATION_PER_SCENE}
					>
						<FlashScene batch={batch} />
					</Series.Sequence>
				))}


			</Series>

			<Sequence from={0} durationInFrames={Math.ceil(FLASH_DATA.length / 3) * (5 * 30)}>
				<BackMusicShow />
			</Sequence>

			<Sequence from={Math.ceil(FLASH_DATA.length / 3) * (5 * 30)}
				durationInFrames={30}
			>
				{/* 背景层 */}
				<AbsoluteFill style={{ backgroundColor: 'black' }} />

				{/* 背景图层 (0.35 透明度 + 居中) */}
				<AbsoluteFill>
					<Img
						src={staticFile('background.jpeg')}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							opacity: 0.3,
						}}
					/>
				</AbsoluteFill>

			</Sequence>
		</AbsoluteFill>

	);
};

MainScene_Flash.calculateMetadata = async () => {
	const sceneCount = Math.ceil(CARD_DATA.length / 3);
	return {
		durationInFrames: sceneCount * (5 * 30),
	};
};