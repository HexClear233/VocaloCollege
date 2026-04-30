// export const MyComposition = () => {
//   return null;
// };
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Sequence,
} from 'remotion';
import React, { useEffect, useState } from 'react';
import { CardData, videoHeight, videoWidth } from './constants';
import { getVideoMetadata, VideoMetadata } from "@remotion/media-utils";

const fontStyle = `
  @font-face {
    font-family: 'SourceHanSansSC';
    src: url(${staticFile('SourceHanSansSC-Medium.otf')}) format('truetype');
  }
`;


export const FadeInOut = ({ children, startFrame = 0, duration = 30 }: { children: React.ReactNode; startFrame?: number; duration?: number }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 入场淡入 (Fade In)
  const fadeIn = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 出场淡出 (Fade Out)
  const fadeOut = interpolate(
    frame,
    [durationInFrames - duration, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 叠加透明度
  const opacity = Math.min(fadeIn, fadeOut);

  return <div style={{ opacity }}>{children}</div>;
};

export const FadeIn = ({ children, startFrame = 0, duration = 30 }: { children: React.ReactNode; startFrame?: number; duration?: number }) => {
  const frame = useCurrentFrame();

  // 入场淡入 (Fade In)
  const fadeIn = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 叠加透明度
  const opacity = Math.min(fadeIn);

  return <div style={{ opacity }}>{children}</div>;
};

const FadeOutTime = 80;


export const MainScene: React.FC<{ data: CardData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);

  useEffect(() => {
    getVideoMetadata(staticFile(data.videoPath)).then(setMetadata);
  }, [data.videoPath]);

  // 动画配置：在前 30 帧内完成
  const duration = 30;

  // 1. 不透明度动画：从 0 变到 1
  // const opacity = interpolate(frame, [0, duration], [0, 1], {
  //   extrapolateRight: 'clamp',
  // });

  // // 2. 位移动画：从 -50px 移到 0px (向右滑动)
  // const translateX = interpolate(frame, [0, duration], [-50, 0], {
  //   extrapolateRight: 'clamp',
  // });



  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <style>{fontStyle}</style>
      {/* 背景图片 (0.3 虚化效果) */}
      <Sequence from={0}>
        <Img
          src={staticFile("background.jpeg")}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
          }}
        />
      </Sequence>

      {/* 社团图标（头像） */}
      <Sequence from={0} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - FadeOutTime}>
        <Img
          src={staticFile(data.clubiconPath)}
          style={{
            position: 'absolute',
            top: 1 * videoHeight / 1080,
            left: '50%',
            width: '3%',
            opacity: 0.45,
          }}
        />
      </Sequence>

      {/* 边框层 */}
      <Sequence from={0} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - FadeOutTime}>
        <Img
          src={staticFile("frame_back.png")}
          style={{ position: 'absolute', width: '100%', opacity: 0.5 }}
        />
        <Img
          src={staticFile("frame_fill.png")}
          style={{ position: 'absolute', width: '100%' }}
        />
      </Sequence>

      {/* 视频主体层 */}
      <AbsoluteFill style={{ /*justifyContent: 'center', alignItems: 'center', */top: 2.34 / 19.05 * videoHeight, left: 0 }}>
        <FadeInOut duration={FadeOutTime}>
          {metadata ? (
            <OffthreadVideo
              src={staticFile(data.videoPath)}
              volume={interpolate(
                frame,
                [(data.timestampEnd - data.timestampStart) * fps - FadeOutTime, (data.timestampEnd - data.timestampStart) * fps],
                [1, 0],
                {
                  // easing: Easing.out(Easing.quad),
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }
              )}
              trimBefore={data.timestampStart * fps}
              trimAfter={data.timestampEnd * fps}
              style={{
                height: '80%',
                position: 'absolute',
                left: 0.4 * videoWidth - (0.8 * videoHeight * (metadata.width / metadata.height)) / 2,
                // borderRadius: 20,
                transform: `scale(1)`,
              }}
            />
          ) : null}
        </FadeInOut>
      </AbsoluteFill>



      {/* 文字 UI 层 (示例：Uploader 和 Title) */}

      {/* UP主 */}
      <Sequence from={0} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - FadeOutTime}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: 1.02 / 19.05 * videoHeight,
          color: 'white',
          fontSize: 30 * videoHeight / 1080,
          textAlign: 'center',
          fontFamily: 'SourceHanSansSC',

          // 核心对齐属性
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          alignItems: 'left', // 关键：所有内容强制靠左对齐
          alignContent: 'center',

          opacity: interpolate(frame, [0, duration], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [0, duration], [-50, 0], {
            extrapolateRight: 'clamp',
          }),
        }}>
          {data.uploader}

        </div>
      </Sequence>

      {/* 社团名称 */}
      <Sequence from={0} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - FadeOutTime}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',

          color: 'white',
          fontSize: 30 * videoHeight / 1080,
          textAlign: 'center',
          fontFamily: 'SourceHanSansSC',

          height: 1.02 / 19.05 * videoHeight,
          // 核心对齐属性
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          alignItems: 'left', // 关键：所有内容强制靠左对齐
          alignContent: 'center',

          opacity: interpolate(frame, [0, duration], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [0, duration], [-50, 0], {
            extrapolateRight: 'clamp',
          }),
        }}>
          {data.clubname}
        </div></Sequence>



      {/* 所属类别 */}
      <Sequence from={30} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - 30 - FadeOutTime}>
        <div style={{
          position: 'absolute',
          top: 1.02 / 19.05 * videoHeight + 20 * videoHeight / 1080,
          left: 0,
          width: '6.8%',
          height: 72 * videoHeight / 1080,
          color: '#8190dc',
          fontSize: 35 * videoHeight / 1080,
          textAlign: 'center',
          fontFamily: 'SourceHanSansSC',
        }}>
          {data.category}
        </div></Sequence>

      {/* 视频标题 */}
      <Sequence from={30} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - 30 - FadeOutTime}>
        <div style={{
          width: 1780 * videoWidth / 1920,
          height: 72 * videoHeight / 1080, // 固定高度
          left: 140 * videoWidth / 1920,
          top: (1.02 / 19.05) * videoHeight,
          position: 'absolute',
          color: 'white',

          fontSize: 'clamp(25px, 1.5vw, 30px)',
          fontFamily: 'SourceHanSansSC',

          opacity: interpolate(frame, [30, duration + 30], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [30, duration + 30], [-50, 0], {
            extrapolateRight: 'clamp',
          }),

          // 核心对齐属性
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          alignItems: 'left', // 关键：所有内容强制靠左对齐
          textAlign: 'left',
          alignContent: 'center',

          // 溢出处理

          wordBreak: 'break-word',
          lineHeight: 1.2,
          overflow: 'hidden', // 防止超出 144px 高度
          display: '-webkit-box', // 使用 Line Clamp 方案
          WebkitLineClamp: 2,     // 强制最多 2 行
          WebkitBoxOrient: 'vertical',


        }}>
          {data.title}
        </div></Sequence>

      {/* 侧边栏信息 (Music Staff, Visual Staff etc.) */}

      {/* 标签 */}
      <Sequence from={120} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - 120 - FadeOutTime}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 20 * videoHeight / 1080,
          fontFamily: 'SourceHanSansSC',
          width: videoWidth * 0.2,
          left: videoWidth * 0.8,
          top: 136 * videoHeight / 1080,
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          // alignItems: 'center', // 关键：所有内容强制靠左对齐
          textAlign: 'center',
          letterSpacing: '5px',
          // alignContent: 'center',

          wordBreak: 'break-word',
          lineHeight: 1.2,
          overflow: 'visible',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
        }}>
          {data.typeIndex}
        </div>
      </Sequence>

      {/* 歌手，引擎 */}
      <Sequence from={90} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - 90 - FadeOutTime}>
        <div style={{
          position: 'absolute',
          color: data.vocalColor,
          fontSize: 35 * videoHeight / 1080,
          fontFamily: 'SourceHanSansSC',
          width: videoWidth * 0.2,
          left: videoWidth * 0.8,
          top: 180 * videoHeight / 1080,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          alignItems: 'center', // 关键：所有内容强制靠左对齐
          textAlign: 'center',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.2,
          overflow: 'clip',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
        }}>
          {data.vocal}
        </div>
      </Sequence>

      {/* 听觉部分STAFF */}
      <Sequence from={150} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - 150 - FadeOutTime}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: (data.musicStaff.length > 80 ? 24 : 30) * videoHeight / 1080,
          fontFamily: 'SourceHanSansSC',
          width: videoWidth * 0.16,
          height: videoHeight * 6.04 / 19.05,
          left: videoWidth * 0.82,
          top: videoHeight * 3.96 / 19.05,

          opacity: interpolate(frame, [150, duration + 150], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [150, duration + 150], [-50, 0], {
            extrapolateRight: 'clamp',
          }),

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          alignItems: 'center', // 关键：所有内容强制靠左对齐
          textAlign: 'center',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: data.musicStaff.length > 80 ? 1 : 1.6,
          overflow: 'visible',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {data.musicStaff}
        </div>
      </Sequence>

      {/* 视觉部分STAFF */}
      <Sequence from={150} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - 150 - FadeOutTime}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 30 * videoHeight / 1080,
          fontFamily: 'SourceHanSansSC',
          width: videoWidth * 0.16,
          height: videoHeight * 4.85 / 19.05,
          left: videoWidth * 0.82,
          top: videoHeight * 10 / 19.05,

          opacity: interpolate(frame, [150, duration + 150], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [150, duration + 150], [-50, 0], {
            extrapolateRight: 'clamp',
          }),

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          alignItems: 'center', // 关键：所有内容强制靠左对齐
          textAlign: 'center',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.2,
          overflow: 'visible',
          WebkitLineClamp: 8,
          WebkitBoxOrient: 'vertical',
        }}>
          {data.visualStaff}
        </div>
      </Sequence>

      {/* Notes */}
      <Sequence from={270} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - 270 - FadeOutTime}>
        <div style={{
          width: videoWidth * 0.8 - 25 * videoHeight / 1080,           // 相当于 MoviePy 的 size 宽
          height: 80 * videoHeight / 1080,          // 相当于 MoviePy 的 size 高

          left: 20 * videoHeight / 1080,
          top: 1004 * videoHeight / 1080,
          fontSize: 25 * videoHeight / 1080,
          color: 'white',

          opacity: interpolate(frame, [270, duration + 270], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          translate: interpolate(frame, [270, duration + 270], [-50, 0], {
            extrapolateRight: 'clamp',
          }),

          // 核心对齐属性
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',    // 垂直居中
          justifyContent: 'left', // 水平居中
          textAlign: 'left',     // 文本内部换行后的对齐方式

          // 溢出处理
          wordBreak: 'break-word',
          lineHeight: 1.4,
          fontFamily: 'SourceHanSansSC',

          position: 'absolute',
        }}>
          {data.notes}
        </div>
      </Sequence>

      {/* 发布时间 */}
      <Sequence from={220} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - 220 - FadeOutTime}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 40 * videoHeight / 1080,
          
          fontFamily: 'Noto Sans SC',
          fontWeight: 60,
          fontStyle: 'italic',
          
          width: videoWidth * 0.2,
          height: 66 * videoHeight / 1080,
          left: videoWidth * 0.8,
          top: 860 * videoHeight / 1080,
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          // alignItems: 'center', // 关键：所有内容强制靠左对齐
          textAlign: 'center',
        }}>
          {data.time}
        </div>
      </Sequence>

      {/* 视频BVID */}
      <Sequence from={220} durationInFrames={(data.timestampEnd - data.timestampStart) * fps - 220 - FadeOutTime}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 40 * videoHeight / 1080,

          fontFamily: 'Noto Sans SC',
          fontWeight: 60,
          fontStyle: 'italic',

          width: videoWidth * 0.2,
          height: 66 * videoHeight / 1080,
          left: videoWidth * 0.8,
          top: 930 * videoHeight / 1080,
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          // alignItems: 'center', // 关键：所有内容强制靠左对齐
          textAlign: 'center',
        }}>
          {data.bvid}
        </div>
      </Sequence>

      {/* LOGO */}
      <Img
        src={staticFile("logo_white_1.png")}
        style={{
          position: 'absolute',
          bottom: -2.5 * videoHeight / 1080,
          right: 0,
          width: 384 * videoHeight / 1080
        }}
      />
    </AbsoluteFill>
  );
};
