// Remotion组件主文件: src/Index.tsx
import { Composition, staticFile, Sequence, Video, AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';

// 视频配置
export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 5,
  durationInFrames: 5 * 5, // 5秒 * 5fps
  id: 'EmotionEcho'
};

// 数据类型定义
interface CardData {
  uploader: string;
  clubname: string;
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
  clubicon: string;
  timestampStart: number;
  timestampEnd: number;
  videoPath: string;
}

const cardData: CardData[] = [
  {
    uploader: "洛天依P",
    clubname: "中术大学",
    category: "[OC]",
    typeIndex: "[SPECIAL PICK]",
    title: "2026年了，还有人愿意听这样的民国风原创歌曲吗？【洛天依、乐正绫】乡·水·忆｜\"乡水一如初见\"【南北组】【\"梦光之约\"新春歌会单品】",
    vocal: "洛天依ACE 乐正绫ACE",
    vocalColor: "#66ccff",
    musicStaff: "溯星P，三叁九玖awa，鬼面P，linkfqy，洛天依P",
    visualStaff: "陌玖XG，穗月黎花",
    time: "2026-02-20",
    bvid: "BV1S5fgBfEZY",
    notes: "首先，中术大学是很强的中术创作社团，再加上鬼面P的调教和其他协助，其数据和质量，个人认为，近似于，甚至超越于《丹心落》（2025Vol.1 V7）。",
    clubicon: "/OC2.webp",
    timestampStart: 0,
    timestampEnd: 80,
    videoPath: "/videos/BV1S5fgBfEZY.mp4"
  }
];

// 主组件
export const EmotionEcho: React.FC = () => {
  return (
    <>
      {cardData.map((data, index) => (
        <Sequence key={index} from={index * 400} durationInFrames={400}>
          <SingleCard data={data} />
        </Sequence>
      ))}
    </>
  );
};

// 单卡组件
const SingleCard: React.FC<{ data: CardData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  
  const videoStart = data.timestampStart;
  const videoEnd = data.timestampEnd;
  const videoDuration = videoEnd - videoStart;
  const videoDurationFrames = videoDuration * fps;
  
  // 动画进度
  const fadeInProgress = Math.min(frame / fps, 1);
  const slideInProgress = Math.min(Math.max((frame - 30) / fps, 0), 1);
  
  // 位置计算
  const uploaderHeight = (1.02 / 19.05) * height;
  const typeWidth = (2.31 / 33.867) * width;
  const typeHeight = (1.02 / 19.05) * height;
  const rightWidth = 0.2 * width;
  const indexHeight = (0.54 / 19.05) * height;
  const vocalHeight = (1.14 / 19.05) * height;
  const musicStaffHeight = (6.04 / 19.05) * height;
  const visualStaffHeight = (4.85 / 19.05) * height;
  
  // 滑动偏移
  const slideOffset = (1 - slideInProgress) * 200;
  
  const videoScale = 0.8;
  const videoX = 1536 - 1536 * 1920 / 1080 / 1920 * videoScale;
  const videoY = uploaderHeight + typeHeight;
  
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* 静态背景层 */}
      <AbsoluteFill>
        <Img 
          src={staticFile('/background.jpeg')} 
          style={{ 
            opacity: 0.3,
            width: 'auto',
            height: height,
            objectFit: 'cover',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }} 
        />
        <Img 
          src={staticFile('/frame_back.png')} 
          style={{ 
            opacity: 0.5,
            width: width,
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }} 
        />
        <Img 
          src={staticFile('/frame_fill.png')} 
          style={{ 
            width: width,
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }} 
        />
        <Img 
          src={staticFile('/logo_white_1.png')} 
          style={{ 
            width: '17%',
            position: 'absolute',
            bottom: 20,
            right: 20
          }} 
        />
      </AbsoluteFill>
      
      {/* 视频层 */}
      {frame >= 0 && (
        <Video 
          src={staticFile(data.videoPath)}
          startFrom={videoStart}
          endAt={videoEnd}
          style={{
            width: width * videoScale,
            position: 'absolute',
            left: videoX,
            top: videoY,
            opacity: fadeInProgress
          }}
        />
      )}
      
      {/* 文字层 */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        opacity: fadeInProgress
      }}>
        {/* 上传者 */}
        <div style={{
          position: 'absolute',
          left: slideOffset,
          top: 0,
          width: width / 2,
          height: uploaderHeight,
          color: 'white',
          fontSize: 80,
          fontFamily: 'sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {data.uploader}
        </div>
        
        {/* 社团名 */}
        <div style={{
          position: 'absolute',
          right: slideOffset,
          top: 0,
          width: width / 2,
          height: uploaderHeight,
          color: 'white',
          fontSize: 80,
          fontFamily: 'sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {data.clubname}
        </div>
        
        {/* 分类 */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: typeHeight,
          width: typeWidth,
          height: typeHeight,
          color: 'white',
          fontSize: 80,
          fontFamily: 'sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {data.category}
        </div>
        
        {/* 标题 */}
        <div style={{
          position: 'absolute',
          left: typeWidth + slideOffset,
          top: typeHeight,
          width: width - typeWidth - rightWidth,
          height: typeHeight,
          color: 'white',
          fontSize: 60,
          fontFamily: 'sans-serif',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {wrapText(data.title, 25)}
        </div>
        
        {/* 右侧区域 */}
        <RightPanel 
          data={data}
          slideOffset={slideOffset}
          width={width}
          height={height}
          startY={uploaderHeight + typeHeight}
        />
      </div>
    </AbsoluteFill>
  );
};

// 右侧面板组件
const RightPanel: React.FC<{ data: CardData; slideOffset: number; width: number; height: number; startY: number }> = 
({ data, slideOffset, width, startY, height }) => {
  const rightWidth = 0.2 * width;
  const indexHeight = (0.54 / 19.05) * height;
  const vocalHeight = (1.14 / 19.05) * height;
  const musicStaffHeight = (6.04 / 19.05) * height;
  const visualStaffHeight = (4.85 / 19.05) * height;
  const otherHeight = (1.17 / 19.05) * height;
  
  const items = [
    { text: data.typeIndex, height: indexHeight, color: 'white' },
    { text: data.vocal, height: vocalHeight, color: data.vocalColor },
    { text: data.musicStaff, height: musicStaffHeight, color: 'white' },
    { text: data.visualStaff, height: visualStaffHeight, color: 'white' },
    { text: data.time, height: otherHeight, color: 'white' },
    { text: data.bvid, height: otherHeight, color: 'white' },
    { text: data.notes, height: otherHeight, color: 'white' }
  ];
  
  let currentY = startY;
  
  return (
    <div style={{
      position: 'absolute',
      right: slideOffset,
      width: rightWidth,
      top: 0
    }}>
      {items.map((item, idx) => {
        const yPos = currentY;
        currentY += item.height;
        return (
          <div key={idx} style={{
            position: 'absolute',
            right: 0,
            top: yPos,
            width: rightWidth,
            height: item.height,
            color: item.color,
            fontSize: idx === 0 ? 80 : 60,
            fontFamily: 'sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden'
          }}>
            {wrapText(item.text, idx === 0 ? 20 : 15)}
          </div>
        );
      })}
    </div>
  );
};

// 文本换行辅助函数
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split('');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const char of words) {
    if ((currentLine + char).length > maxChars) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine += char;
    }
  }
  if (currentLine) lines.push(currentLine);
  
  return lines;
}

// 主入口
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EmotionEcho"
        component={EmotionEcho}
        durationInFrames={cardData.length * 400}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};