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
    Html5Audio
} from 'remotion';
import React from 'react';
import { CardData, Outro, Intro, videoVersionData, videoHeight, videoWidth } from './constants';

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

export const IntroScene: React.FC = () => {
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
                            [0, 60],
                            [1, 0.3],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        ),
                    }}
                />
            </Sequence>


            {/* Intro背景音乐 */}
            <Sequence from={180} durationInFrames={Intro - 180}>
                <Html5Audio
                    src={staticFile('1.mp3')}
                    volume={interpolate(
                        frame,
                        [Intro - 180, Intro],
                        [1, 0],
                        {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        }
                    )}
                    trimBefore={0}
                    trimAfter={Intro - 180} />

            </Sequence>

            <Sequence from={180} durationInFrames={Intro - 180}>
                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 35 * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',

                    bottom: 3 * videoHeight / 1080,
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
                    lineHeight: 1.7,
                    letterSpacing: '1px',
                    overflow: 'visible',
                    WebkitLineClamp: 10,
                    WebkitBoxOrient: 'vertical',

                    whiteSpace: 'pre-wrap',
                }}>
                    {"*背景音乐：" + videoVersionData["introBackmusic"]}
                </div>

            </Sequence>


            {/* Intro */}

            {/* 开屏LOGO */}
            <Sequence from={90} durationInFrames={180}>
                <Img
                    src={staticFile("logo_white_1.png")}
                    style={{
                        position: 'absolute',
                        width: videoWidth * 0.6,
                        top: videoHeight * 0.3,
                        left: videoWidth * 0.2,
                        opacity: interpolate(frame, [0, duration], [0, 1], {
                            extrapolateRight: 'clamp',
                        }),
                        translate: interpolate(frame, [0, duration], [-50, 0], {
                            extrapolateRight: 'clamp',
                        }),
                    }}
                />

            </Sequence>

            {/* 档期标注 */}
            <Sequence from={120} durationInFrames={150}>
                <div style={{
                    position: 'absolute',
                    color: 'gold',
                    fontSize: 80 * videoHeight / 1080,

                    fontFamily: 'Noto Serif JP Black',
                    fontStyle: 'italic',

                    fontWeight: 100,


                    width: videoWidth * 0.8,
                    top: videoHeight * 0.55,
                    left: videoWidth * 0.45,

                    opacity: interpolate(frame, [0, duration], [0, 1], {
                        extrapolateRight: 'clamp',
                    }),
                    translate: interpolate(frame, [0, duration], [-50, 0], {
                        extrapolateRight: 'clamp',
                    }),

                    whiteSpace: 'pre-wrap',
                }}>
                    {"Year " + videoVersionData["year"]}
                </div>
            </Sequence>

            <Sequence from={120} durationInFrames={150}>
                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 80 * videoHeight / 1080,

                    fontFamily: 'Noto Serif JP',
                    fontStyle: 'italic',

                    fontWeight: 100,

                    opacity: interpolate(frame, [0, duration], [0, 1], {
                        extrapolateRight: 'clamp',
                    }),
                    translate: interpolate(frame, [0, duration], [-50, 0], {
                        extrapolateRight: 'clamp',
                    }),

                    width: videoWidth * 0.8,
                    top: videoHeight * 0.55,
                    left: videoWidth * 0.68,

                    whiteSpace: 'pre-wrap',
                }}>
                    {videoVersionData["version"]}
                </div>
            </Sequence>

            {/* 右上LOGO */}
            <Sequence from={300} durationInFrames={Intro - 300}>
                <Img
                    src={staticFile("logo_white_2.png")}
                    style={{
                        position: 'absolute',
                        right: 60 / 1920 * videoWidth, // 对应 Python 3260 (videoWidth - 3260 左右)
                        top: 60 / 1080 * videoHeight,
                        width: 2838 * 0.08 * videoHeight / 1080,
                    }}
                />
            </Sequence>

            {/* 栏目介绍 */}
            <Sequence from={300} durationInFrames={210}>

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

                    top: 90,
                    left: 150,

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
                    {"栏目介绍"}
                </div>
            </Sequence>

            <Sequence from={330} durationInFrames={180}>
                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 60 * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',


                    width: videoWidth * 0.8,
                    top: 320,
                    left: 50,

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
                    {"栏目《高校术力口之声》 核心：\
                            \n\
                            \n\t"}
                </div>

                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 60 * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',


                    width: videoWidth * 0.8,
                    top: videoHeight * (0.5 + 25 / 1080),
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
                    {"「展现高校的术力口活力，展现术力口的高校力量。」"}
                </div>
            </Sequence>

            {/* 收录概览 */}
            <Sequence from={510} durationInFrames={230}>

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

                    top: (90 / 1080) * videoHeight,
                    left: (150 / 1920) * videoWidth,

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
                    {"收录概览"}
                </div>
            </Sequence>

            <Sequence from={540} durationInFrames={200}>
                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 60 * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',


                    width: videoWidth * 0.8,
                    top: videoHeight * 0.35,
                    left: (150 / 1920) * videoWidth,

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
                    {"收录时间：" + videoVersionData["collectTime"]}
                </div>

                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 60 * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',


                    width: videoWidth * 0.8,
                    top: videoHeight * 0.55,
                    left: 150 / 1920 * videoWidth,

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
                    {"搜索范围：" + videoVersionData["collectClubNum"] + "（院校社团）/ " + videoVersionData["collectVideoNum"] + "（稿件数量）"}
                </div>

            </Sequence>

            {/* 免责声明 */}
            <Sequence from={770} durationInFrames={240}>
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
                    {"各模块的展示顺序仅为个人主观设计排序\
\n非官方排名，仅作同好交流与作品推介。"}
                </div>
            </Sequence>

            {/* 视频目录 */}
            <Sequence from={1040} durationInFrames={300}>

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

                    top: 90 / 1080 * videoHeight,
                    left: 150 / 1920 * videoWidth,

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
                    {"视频目录"}
                </div>
            </Sequence>

            <Sequence from={1070} durationInFrames={270}>
                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 58 * videoHeight / 1080,

                    fontFamily: 'Noto Serif JP',
                    fontStyle: 'italic',

                    fontWeight: 100,

                    top: videoHeight * 0.28,
                    left: 225 / 1920 * videoWidth,

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
                    {"Chapter 1    原创作品 [OC]    \
\nChapter 2    翻调作品 [RT]\
\nChapter 3    翻唱翻奏作品 [VC] [IC]\
\nChapter 4    衍生快闪\
\nSpecial Pick"}
                </div>

                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 58 * videoHeight / 1080,

                    fontFamily: 'Noto Serif JP',
                    fontStyle: 'italic',

                    fontWeight: 100,

                    top: videoHeight * 0.28,
                    left: 1375 / 1920 * videoWidth,

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
                    {"01:01" + "\n" + videoVersionData["chap2Time"] + "\n" + videoVersionData["chap3Time"] + "\n" + videoVersionData["chap4Time"] + "\n" + videoVersionData["spTime"]}
                </div>


            </Sequence>

            {/* 本期概况 */}
            <Sequence from={1370} durationInFrames={Intro - 1370 - 60}>

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

                    top: 90 / 1080 * videoHeight,
                    left: 150 / 1920 * videoWidth,

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
                    {"本期概况"}
                </div>
            </Sequence>

            <Sequence from={1440} durationInFrames={Intro - 1440 - 60}>
                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: (videoVersionData["description"].length > 100? 42 : 50) * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',


                    width: videoWidth * 0.8,
                    height: videoHeight * 0.8,
                    left: videoWidth * 0.1,
                    top: videoHeight * 0.1,

                    // display: 'flex',
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
                    {videoVersionData["description"]}
                </div>


            </Sequence>

        </AbsoluteFill>
    );
};