import "./index.css";
import { CombinedVideo, getTotalTime } from "./VideoAllOrder";
import { Composition } from "remotion";
import { MainScene } from './Composition';
import { VIDEO_DATA, FLASH_DATA, Outro, Intro, videoWidth, videoHeight } from './constants';

let totalDuration = (VIDEO_DATA[0].timestampEnd - VIDEO_DATA[0].timestampStart) * 30 + 3 * 30;
totalDuration += (VIDEO_DATA[1].timestampEnd - VIDEO_DATA[1].timestampStart) * 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {<Composition
        id="MainVideo0"
        component={MainScene}
        durationInFrames={(VIDEO_DATA[0].timestampEnd - VIDEO_DATA[0].timestampStart) * 30} // 80秒 * 30fps
        fps={30}
        width={1920} // 对应原本的 1920 * 2
        height={1080} // 对应原本的 1080 * 2
        defaultProps={{
          data: VIDEO_DATA[0],
        }}
      />}
      <Composition
        id="MainVideo"
        component={CombinedVideo}
        durationInFrames={27000}
        fps={29.97}
        width={videoWidth}
        height={videoHeight}

        calculateMetadata={async ({ }) => {
          return {
            durationInFrames: getTotalTime(),
          };
        }}
      />
    </>
  );
};
