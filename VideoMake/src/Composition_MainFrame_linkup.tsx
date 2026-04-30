// export const MyComposition = () => {
//   return null;
// };
import {
    AbsoluteFill,
    Img,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
    staticFile,
    Sequence,
} from 'remotion';
import React from 'react';
import { bottomNoteLineHeight, ChapterLink, Intro, LinkText, videoHeight } from './constants';

const fontStyle = `
  @font-face {
    font-family: 'SourceHanSansSC';
    src: url(${staticFile('SourceHanSansSC-Medium.otf')}) format('truetype');
  }
`;

const linkString = "▷NEXT▷";

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

export const MainSceneLink: React.FC = () => {
    const frame = useCurrentFrame();
    const duration = 30;
    // const linkText = linkData.link.text

    return (
        <AbsoluteFill style={{
            backgroundColor: 'black',
            justifyContent: 'center', // 水平居中
            alignItems: 'center',     // 垂直居中
            display: 'flex',          // 必须设置为 flex 布局
        }}>
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


            {/* 文字 UI 层*/}

            {/* <Sequence from={0} durationInFrames={3 * 30}>
                <div style={{
                    position: 'absolute',

                    color: 'white',
                    fontSize: 150,

                    fontStyle: 'italic',
                    textAlign: 'center',
                    fontFamily: 'SourceHanSansSC',

                    // 核心对齐属性
                    justifyContent: 'center', // 垂直居中（如果只有一行，它会上下居中在144px内）
                    alignItems: 'center', // 关键：所有内容强制靠左对齐
                    alignContent: 'center',

                    opacity: interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0], {
                        extrapolateRight: 'clamp',
                    }),
                    translate: interpolate(frame, [0, 30, 60, 90], [-50, 0, 0, -50], {
                        extrapolateRight: 'clamp',
                    }),
                }}>
                    {linkString}

                </div>
            </Sequence> */}

            <h1 style={{
                color: 'white',
                fontSize: 75 * videoHeight / 1080,
                textAlign: 'center', // 确保多行文字时内部也居中


                fontStyle: 'italic',
                fontFamily: 'SourceHanSansSC',


                opacity: interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0], {
                    extrapolateRight: 'clamp',
                }),
                translate: interpolate(frame, [0, 30, 60, 90], [-50, 0, 0, -50], {
                    extrapolateRight: 'clamp',
                }),
            }}>
                {linkString}
            </h1>


        </AbsoluteFill>
    );
};

export const SceneLink_Chap0: React.FC = () => {
    const frame = useCurrentFrame();
    const duration = ChapterLink + 30;
    // const linkText = linkData.link.text

    return (
        <AbsoluteFill style={{
            backgroundColor: 'black',
            justifyContent: 'center', // 水平居中
            alignItems: 'center',     // 垂直居中
            display: 'flex',          // 必须设置为 flex 布局
        }}>
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

            {/* LOGO */}
            <Sequence from={0} durationInFrames={duration}>
                <Img
                    src={staticFile("logo_white_2.png")}
                    style={{
                        position: 'absolute',
                        right: 60 * videoHeight / 1080, // 对应 Python 3260 (3840 - 3260 左右)
                        top: 60 * videoHeight / 1080,
                        width: 2838 * 0.08 * videoHeight / 1080, // resized(0.17)
                    }}
                />
            </Sequence>

            {/* Bottom Note */}
            <Sequence from={45} durationInFrames={ChapterLink - 45 - 30}>

                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 32 * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',

                    bottom: 5 * videoHeight / 1080,
                    left: 20 * videoHeight / 1080,

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
                    {"*[OC] Original Content / 原创作品    \
\n拥有独立词、曲、编、调体系的完整虚拟歌手原创曲或全原创作品产出。\
\n（全原创的其他作品，比如全原创语调教可算入其中）"}
                </div></Sequence>



            {/* 文字 UI 层*/}

            {/* 主标题 */}
            <h1 style={{
                color: 'white',
                fontSize: 75 * videoHeight / 1080,
                textAlign: 'center', // 确保多行文字时内部也居中


                fontStyle: 'italic',
                fontFamily: 'SourceHanSansSC',


                opacity: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [0, 1, 1, 0], {
                    extrapolateRight: 'clamp',
                }),
                translate: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [-50, 0, 0, -50], {
                    extrapolateRight: 'clamp',
                }),

                whiteSpace: 'pre-wrap'
            }}>
                {"▶START▷\nChapter 1    原创作品 [OC]"}
            </h1>


        </AbsoluteFill>
    );
};

export const SceneLink_Chap1: React.FC = () => {
    const frame = useCurrentFrame();
    const duration = ChapterLink + 30;
    // const linkText = linkData.link.text

    return (
        <AbsoluteFill style={{
            backgroundColor: 'black',
            justifyContent: 'center', // 水平居中
            alignItems: 'center',     // 垂直居中
            display: 'flex',          // 必须设置为 flex 布局
        }}>
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

            {/* LOGO */}
            <Sequence from={0} durationInFrames={duration}>
                <Img
                    src={staticFile("logo_white_2.png")}
                    style={{
                        position: 'absolute',
                        right: 60 * videoHeight / 1080, // 对应 Python 3260 (3840 - 3260 左右)
                        top: 60 * videoHeight / 1080,
                        width: 2838 * 0.08 * videoHeight / 1080, // resized(0.17)
                    }}
                />
            </Sequence>

            {/* Bottom Note */}
            <Sequence from={45} durationInFrames={ChapterLink - 45 - 30}>

                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 32 * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',

                    bottom: 3 * videoHeight / 1080,
                    left: 10 * videoHeight / 1080,

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
                    {"*[RT] Re-Tuning / 翻调作品\
\n    使用术力口声库对既有曲目进行重新调教、填词或编曲."}
                </div></Sequence>



            {/* 文字 UI 层*/}

            {/* 主标题 */}
            <h1 style={{
                color: 'white',
                fontSize: 75 * videoHeight / 1080,
                textAlign: 'center', // 确保多行文字时内部也居中


                fontStyle: 'italic',
                fontFamily: 'SourceHanSansSC',


                opacity: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [0, 1, 1, 0], {
                    extrapolateRight: 'clamp',
                }),
                translate: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [-50, 0, 0, -50], {
                    extrapolateRight: 'clamp',
                }),

                whiteSpace: 'pre-wrap'
            }}>
                {"▶START▷\nChapter 2    翻调作品 [RT]"}
            </h1>


        </AbsoluteFill>
    );
};

export const SceneLink_Chap2: React.FC = () => {
    const frame = useCurrentFrame();
    const duration = ChapterLink + 30;
    // const linkText = linkData.link.text

    return (
        <AbsoluteFill style={{
            backgroundColor: 'black',
            justifyContent: 'center', // 水平居中
            alignItems: 'center',     // 垂直居中
            display: 'flex',          // 必须设置为 flex 布局
        }}>
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

            {/* LOGO */}
            <Sequence from={0} durationInFrames={duration}>
                <Img
                    src={staticFile("logo_white_2.png")}
                    style={{
                        position: 'absolute',
                        right: 60 * videoHeight / 1080, // 对应 Python 3260 (3840 - 3260 左右)
                        top: 60 * videoHeight / 1080,
                        width: 2838 * 0.08 * videoHeight / 1080, // resized(0.17)
                    }}
                />
            </Sequence>

            {/* Bottom Note */}
            <Sequence from={45} durationInFrames={ChapterLink - 45 - 30}>

                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 32 * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',

                    bottom: 3 * videoHeight / 1080,
                    left: 10 * videoHeight / 1080,

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
                    {"*[VC] Vocal Cover / 人声翻唱  由高校个人歌手或社团进行的真人人声演绎。（带主唱的乐队演出算入其中）\
\n*[IC] Instrumental Cover / 乐器翻奏 涵盖乐队演奏、民乐适配及各类器乐改编。（不带主唱的乐队演出和仅乐器演出算入其中）"}
                </div></Sequence>



            {/* 文字 UI 层*/}

            {/* 主标题 */}
            <h1 style={{
                color: 'white',
                fontSize: 75 * videoHeight / 1080,
                textAlign: 'center', // 确保多行文字时内部也居中


                fontStyle: 'italic',
                fontFamily: 'SourceHanSansSC',


                opacity: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [0, 1, 1, 0], {
                    extrapolateRight: 'clamp',
                }),
                translate: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [-50, 0, 0, -50], {
                    extrapolateRight: 'clamp',
                }),

                whiteSpace: 'pre-wrap'
            }}>
                {"▶START▷\nChapter 3    翻唱翻奏作品 [VC][IC]"}
            </h1>


        </AbsoluteFill>
    );
};

export const SceneLink_Chap3: React.FC = () => {
    const frame = useCurrentFrame();
    const duration = ChapterLink + 30;
    // const linkText = linkData.link.text

    return (
        <AbsoluteFill style={{
            backgroundColor: 'black',
            justifyContent: 'center', // 水平居中
            alignItems: 'center',     // 垂直居中
            display: 'flex',          // 必须设置为 flex 布局
        }}>
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

            {/* LOGO */}
            <Sequence from={0} durationInFrames={duration}>
                <Img
                    src={staticFile("logo_white_2.png")}
                    style={{
                        position: 'absolute',
                        right: 60 * videoHeight / 1080, // 对应 Python 3260 (3840 - 3260 左右)
                        top: 60 * videoHeight / 1080,
                        width: 2838 * 0.08 * videoHeight / 1080, // resized(0.17)
                    }}
                />
            </Sequence>

            {/* Bottom Note */}
            <Sequence from={45} durationInFrames={ChapterLink - 45 - 30}>

                <div style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 32 * videoHeight / 1080,

                    fontFamily: 'SourceHanSansSC',
                    fontStyle: 'italic',

                    bottom: 3 * videoHeight / 1080,
                    left: 10 * videoHeight / 1080,

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
                    {"*本章节主要包括[DW]类别，和上述章节尚未展示的稿件作品\
\n*[DW] Derivative Works / 衍生创作 包括宅舞（Dance）、MMD、打艺（Wota Gei）及视觉重制等。"}
                </div></Sequence>



            {/* 文字 UI 层*/}

            {/* 主标题 */}
            <h1 style={{
                color: 'white',
                fontSize: 75 * videoHeight / 1080,
                textAlign: 'center', // 确保多行文字时内部也居中


                fontStyle: 'italic',
                fontFamily: 'SourceHanSansSC',


                opacity: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [0, 1, 1, 0], {
                    extrapolateRight: 'clamp',
                }),
                translate: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [-50, 0, 0, -50], {
                    extrapolateRight: 'clamp',
                }),

                whiteSpace: 'pre-wrap'
            }}>
                {"▶START▷\nChapter 4    衍生快闪 "}
            </h1>


        </AbsoluteFill>
    );
};

export const SceneLink_SP: React.FC = () => {
    const frame = useCurrentFrame();
    const duration = ChapterLink + 30;
    // const linkText = linkData.link.text

    return (
        <AbsoluteFill style={{
            backgroundColor: 'black',
            justifyContent: 'center', // 水平居中
            alignItems: 'center',     // 垂直居中
            display: 'flex',          // 必须设置为 flex 布局
        }}>
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

            {/* LOGO */}
            <Sequence from={0} durationInFrames={duration}>
                <Img
                    src={staticFile("logo_white_2.png")}
                    style={{
                        position: 'absolute',
                        right: 60 * videoHeight / 1080, // 对应 Python 3260 (3840 - 3260 左右)
                        top: 60 * videoHeight / 1080,
                        width: 2838 * 0.08 * videoHeight / 1080, // resized(0.17)
                    }}
                />
            </Sequence>

            {/* Bottom Note */}
        
            {/* 文字 UI 层*/}

            {/* 主标题 */}
            <h1 style={{
                color: 'white',
                fontSize: 75 * videoHeight / 1080,
                textAlign: 'center', // 确保多行文字时内部也居中


                fontStyle: 'italic',
                fontFamily: 'SourceHanSansSC',


                opacity: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [0, 1, 1, 0], {
                    extrapolateRight: 'clamp',
                }),
                translate: interpolate(frame, [0, 30, ChapterLink - 30, ChapterLink], [-50, 0, 0, -50], {
                    extrapolateRight: 'clamp',
                }),

                whiteSpace: 'pre-wrap'
            }}>
                {"▶START▷\n\nSpecial Pick "}
            </h1>


        </AbsoluteFill>
    );
};