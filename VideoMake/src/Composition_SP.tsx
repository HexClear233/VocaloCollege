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
  spring,
  staticFile,
  Sequence,
  Easing,
} from 'remotion';
import React from 'react';
import { bottomNoteLineHeight, CardData, Outro, videoHeight, videoWidth } from './constants';

const fontStyle = `
  @font-face {
    font-family: 'SourceHanSansSC';
    src: url(${staticFile('SourceHanSansSC-Medium.otf')}) format('truetype');
  }
`;


export const FadeInOut = ({ children, startFrame = 0, duration = 30 }) => {
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

export const FadeIn = ({ children, startFrame = 0, duration = 30 }) => {
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

export const MainScene_SpecialPick: React.FC<{ data: CardData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 动画配置
  const duration = 30;

  const FadeOutTime = 80;

  const CutTime = 1200;

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
            // opacity: 0.3,
            opacity: interpolate(
              frame,
              [data.timestampStart * fps, data.timestampEnd * fps + FadeOutTime + 1240, data.timestampEnd * fps + Outro - FadeOutTime],
              [0.3, 0.3, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            ),
          }}
        />
      </Sequence>

      {/* 社团图标（头像） */}
      <Sequence from={0} durationInFrames={data.timestampStart * fps + CutTime}>
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
      <Sequence from={0} durationInFrames={data.timestampStart * fps + CutTime}>
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
      <AbsoluteFill style={{
        left: 0,
        top: interpolate(
          frame,
          [data.timestampStart * fps, data.timestampStart * fps + CutTime - 1, data.timestampStart * fps + CutTime, data.timestampEnd * fps],
          [2.34 / 19.05 * videoHeight, 2.34 / 19.05 * videoHeight, 0, 0]
        )
      }}
      /*{{justifyContent: 'center', alignItems: 'center'}}*/
      >
        <FadeInOut duration={FadeOutTime}>
          <OffthreadVideo
            src={staticFile(data.videoPath)}
            volume={interpolate(
              frame,
              [data.timestampEnd * fps + FadeOutTime + 1240, data.timestampEnd * fps + Outro - 2 * FadeOutTime],
              [1, 0],
              {
                // easing: Easing.out(Easing.quad),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }
            )}
            trimBefore={data.timestampStart * fps}
            trimAfter={data.timestampEnd * fps + Outro}
            style={{
              opacity: interpolate(frame,
                [data.timestampStart * fps, data.timestampEnd * fps, data.timestampEnd * fps + FadeOutTime],
                [1, 1, 0]
              ),
              width: interpolate(
                frame,
                [data.timestampStart * fps, data.timestampStart * fps + CutTime - 1, data.timestampStart * fps + CutTime, data.timestampEnd * fps],
                [0.8 * videoWidth, 0.8 * videoWidth, videoWidth, videoWidth]
              )
            }}
          />

        </FadeInOut>
      </AbsoluteFill>



      {/* 文字 UI 层 (示例：Uploader 和 Title) */}

      {/* UP主 */}
      <Sequence from={0} durationInFrames={data.timestampStart * fps + CutTime}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          color: 'white',
          fontSize: 30 * videoHeight / 1080,

          height: 1.02 / 19.05 * videoHeight,
          // 核心对齐属性
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
          alignItems: 'left', // 关键：所有内容强制靠左对齐
          alignContent: 'center',

          textAlign: 'center',
          fontFamily: 'SourceHanSansSC',
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
      <Sequence from={0} durationInFrames={data.timestampStart * fps + CutTime}>
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
        </div>
      </Sequence>

      {/* 所属类别 */}
      <Sequence from={30} durationInFrames={data.timestampStart * fps + CutTime - 30}>
        <div style={{
          position: 'absolute',
          top: 1.02 / 19.05 * videoHeight + 20 * videoHeight / 1080,
          left: 0,
          width: '6.8%',
          color: 'gold',
          fontSize: 35 * videoHeight / 1080,
          textAlign: 'center',
          fontFamily: 'SourceHanSansSC',
        }}>
          {data.category}
        </div>
      </Sequence>

      {/* 视频标题 */}
      <Sequence from={30} durationInFrames={data.timestampStart * fps + CutTime - 30}>
        {/* <div style={{
          width: 1780 * videoWidth / 1920,
          height: 72 * videoHeight / 1080, // 固定高度
          left: 140 * videoWidth / 1920,
          top: (1.02 / 19.05) * videoHeight,
          position: 'absolute',
          color: 'white',

          fontSize: 'clamp(30px, 2vw, 40px)',
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
        </div> */}

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
        </div>
      </Sequence>

      {/* 侧边栏信息 (Music Staff, Visual Staff etc.) */}

      {/* 标签 */}
      <Sequence from={120} durationInFrames={data.timestampStart * fps + CutTime - 120}>
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
      <Sequence from={90} durationInFrames={data.timestampStart * fps + CutTime - 90}>
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
      <Sequence from={150} durationInFrames={data.timestampStart * fps + CutTime - 150}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 30 * videoHeight / 1080,
          fontFamily: 'SourceHanSansSC',
          width: videoWidth * 0.16,
          left: videoWidth * 0.82,
          top: 326 * videoHeight / 1080,

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
          lineHeight: 1.6,
          overflow: 'visible',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
        }}>
          {data.musicStaff}
        </div>
      </Sequence>

      {/* 视觉部分STAFF */}
      <Sequence from={150} durationInFrames={data.timestampStart * fps + CutTime - 150}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 30 * videoHeight / 1080,
          fontFamily: 'SourceHanSansSC',
          width: videoWidth * 0.16,
          left: videoWidth * 0.82,
          top: 690 * videoHeight / 1080,

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
      <Sequence from={270} durationInFrames={data.timestampStart * fps + CutTime - 270}>
        <div style={{
          width: videoWidth * (0.8 - 50 / 3840),           // 相当于 MoviePy 的 size 宽
          height: 80 * videoHeight / 1080,          // 相当于 MoviePy 的 size 高

          left: 20 * videoWidth / 1920,
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
          alignItems: 'center',    // 垂直居中
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
      <Sequence from={220} durationInFrames={data.timestampStart * fps + CutTime - 220}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 40 * videoHeight / 1080,

          fontFamily: 'Noto Sans SC',
          fontWeight: 60,
          fontStyle: 'italic',
          
          width: videoWidth * 0.2,
          height: 56 * videoHeight / 1080,
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
      <Sequence from={220} durationInFrames={data.timestampStart * fps + CutTime - 220}>
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
      <Sequence from={0} durationInFrames={data.timestampEnd * fps + FadeOutTime}>
        <Img
          src={staticFile("logo_white_1.png")}
          style={{
            position: 'absolute',
            bottom: -2.5 * videoHeight / 1080,
            right: 0,
            width: 384 * videoWidth / 1920,
          }}
        />
      </Sequence>


      {/* Outro LOGO */}
      <Sequence from={data.timestampEnd * fps + FadeOutTime + 45} durationInFrames={Outro - FadeOutTime - 30}>
        <Img
          src={staticFile("logo_white_2.png")}
          style={{
            position: 'absolute',
            right: 60 * videoWidth / 1920,
            top: 60 * videoHeight / 1080,
            width: 2838 * 0.08 * videoHeight / 1080,
          }}
        />
      </Sequence>


      {/* Outro */}

      {/* Bottom Note */}
      <Sequence from={data.timestampEnd * fps + FadeOutTime + 70} durationInFrames={1000 - 70}>

        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 35 * videoHeight / 1080,

          fontFamily: 'SourceHanSansSC',
          fontStyle: 'italic',

          bottom: 2.5 * videoHeight / 1080,
          left: 10 * videoHeight / 1080,

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
          textAlign: 'left',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: bottomNoteLineHeight,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"*具体细则与说明详见官方网页。"}
        </div>
      </Sequence>

      <Sequence from={data.timestampEnd * fps + FadeOutTime + 70} durationInFrames={1000 - 70}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 35 * videoHeight / 1080,

          fontFamily: 'SourceHanSansSC',
          fontStyle: 'italic',

          bottom: 2.5 * videoHeight / 1080,
          right: 10 * videoHeight / 1080,

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
          textAlign: 'left',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: bottomNoteLineHeight,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"*栏目联络邮箱：vocalocollege@163.com\
\n*官方网页：https://hexclear233.github.io/VocaloCollege/（建设中）"}
        </div>
      </Sequence>

      {/* 栏目说明 */}
      <Sequence from={data.timestampEnd * fps + FadeOutTime + 45} durationInFrames={235}>

        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 60 * videoHeight / 1080,

          fontFamily: 'Noto Serif JP',
          fontStyle: 'italic',

          display: 'inline-block',          // 让背景贴合文字
          backgroundColor: 'rgba(129,144,220,0.3)',// 半透明黑底
          padding: '5px 15px',              // 背景内边距
          borderRadius: 8,                  // 背景圆角
          textDecoration: '',      // 下划线
          textUnderlineOffset: '8px',       // 下划线偏移
          textDecorationThickness: '4px',

          top: 90 * videoHeight / 1080,
          left: 150 * videoHeight / 1080,

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
          textAlign: 'left',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.7,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"栏目说明"}
        </div></Sequence>
      <Sequence from={data.timestampEnd * fps + FadeOutTime + 70} durationInFrames={210}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 40 * videoHeight / 1080,

          fontFamily: 'SourceHanSansSC',
          fontStyle: 'italic',


          width: videoWidth * 0.8,
          top: videoHeight * 0.25,
          left: 90 * videoHeight / 1080,

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
          textAlign: 'left',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.7,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"1. 视频内所引用的音视频素材均来自 Bilibili 原作者，所属归原 P 主/社团所有，\
\n并遵守相关规定。本视频仅作非营利性交流与推荐，如有侵权请私信处理。\
\n2. 受限于观测视野及栏目篇幅，难免存在社团作品遗漏，\
\n所展示作品并不代表该社团的全部实力。\
\n3. 本栏目包含强烈的策展人审美倾向，\
\n入选、排序及点评仅代表个人观点，非权威排名。\
\n4. 各模块的展示顺序并非代表其质量或流量好坏，\
\n仅为个人主观设计排序。"}
        </div>
      </Sequence>

      {/* 更新说明 */}
      <Sequence from={data.timestampEnd * fps + FadeOutTime + 280} durationInFrames={360}>

        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 60 * videoHeight / 1080,

          fontFamily: 'Noto Serif JP',
          fontStyle: 'italic',

          display: 'inline-block',          // 让背景贴合文字
          backgroundColor: 'rgba(129,144,220,0.3)',// 半透明黑底
          padding: '5px 15px',              // 背景内边距
          borderRadius: 8,                  // 背景圆角
          textDecoration: '',      // 下划线
          textUnderlineOffset: '8px',       // 下划线偏移
          textDecorationThickness: '4px',

          top: 90 * videoHeight / 1080,
          left: 150 * videoHeight / 1080,

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
          textAlign: 'left',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.7,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"更新说明"}
        </div></Sequence>
      <Sequence from={data.timestampEnd * fps + FadeOutTime + 280 + 30} durationInFrames={180}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 40 * videoHeight / 1080,

          fontFamily: 'SourceHanSansSC',
          fontStyle: 'italic',


          width: videoWidth * 0.8,
          top: videoHeight * 0.25,
          left: videoWidth * 0.1,

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
          lineHeight: 1.7,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"本栏目自 2026 年第一期（2026Vol.1）起，\
\n正式开启「一年三刊」制：\
\n\
❄️ 秋冬季/寒假刊 \
\n(每年10月1日 0:00 - 次年3月1日 0:00)\
\n 🌸 春季/毕业刊\
\n (每年3月1日 0:00 - 每年7月1日 0:00)\
\n☀️ 夏季/暑期刊\
\n (每年7月1日 0:00 - 每年10月1日 0:00)"}
        </div>
      </Sequence>

      <Sequence from={data.timestampEnd * fps + FadeOutTime + 280 + 225} durationInFrames={135}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 40 * videoHeight / 1080,

          fontFamily: 'SourceHanSansSC',
          fontStyle: 'italic',


          width: videoWidth * 0.8,
          top: videoHeight * 0.4,
          left: videoWidth * 0.1,

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
          lineHeight: 1.7,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"下期栏目视频计划：\
\n 🌸 春季/毕业刊    2026Vol.2\
\n (2026-03-01 0:00 - 2026-07-01 0:00)"}
        </div>
      </Sequence>

      {/* 栏目联系 */}
      <Sequence from={data.timestampEnd * fps + FadeOutTime + 640} durationInFrames={360}>

        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 60 * videoHeight / 1080,

          fontFamily: 'Noto Serif JP',
          fontStyle: 'italic',

          display: 'inline-block',          // 让背景贴合文字
          backgroundColor: 'rgba(129,144,220,0.3)',// 半透明黑底
          padding: '5px 15px',              // 背景内边距
          borderRadius: 8,                  // 背景圆角
          textDecoration: '',      // 下划线
          textUnderlineOffset: '8px',       // 下划线偏移
          textDecorationThickness: '4px',

          top: 90 * videoHeight / 1080,
          left: 150 * videoHeight / 1080,

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
          textAlign: 'left',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.7,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"栏目联系"}
        </div></Sequence>

      <Sequence from={data.timestampEnd * fps + FadeOutTime + 640 + 30} durationInFrames={330}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 40 * videoHeight / 1080,

          fontFamily: 'SourceHanSansSC',
          fontStyle: 'italic',


          width: videoWidth * 0.8,
          top: videoHeight * 0.27,
          left: videoWidth * 0.1,

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
          textAlign: 'left',
          alignContent: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.7,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"本栏目目前由我个人独立运营。由于精力与视野有限，难免存在观测盲区，\
\n诚挚邀请大家参与查漏补缺：\
\n    推荐/自荐： 欢迎私信提供高校社团账号或作品链接（尤其是新成立的社团）。\
\n    纠错/申诉： 如发现信息标注错误或不愿被收录，请随时私信处理。\
\n    交流建议： 关于栏目形式或分类的建议，评论区或私信见。\
\n    联系方式见视频右下。\
\n\
\n感谢每一位在校园中坚持，支持创作的你。"}
        </div>
      </Sequence>

      {/* 结语 */}
      <Sequence from={data.timestampEnd * fps + FadeOutTime + 1060} durationInFrames={180}>
        <div style={{
          position: 'absolute',
          color: 'white',
          fontSize: 70 * videoHeight / 1080,

          fontFamily: 'SourceHanSansSC',
          fontStyle: 'italic',


          width: videoWidth * 0.8,
          top: videoHeight * 0.35,
          left: videoWidth * 0.1,

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
          lineHeight: 1.7,
          letterSpacing: '1px',
          overflow: 'visible',
          WebkitLineClamp: 10,
          WebkitBoxOrient: 'vertical',

          whiteSpace: 'pre-wrap',
        }}>
          {"本视频到此结束。\
\n在此，感谢所有高校社团的创作。"}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};