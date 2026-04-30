import { Series } from "remotion";
import { MainScene } from './Composition';
import { MainSceneLink, SceneLink_Chap0, SceneLink_Chap1, SceneLink_Chap2, SceneLink_Chap3, SceneLink_SP } from "./Composition_MainFrame_linkup";
import { MainScene_Flash } from "./Composition_Flash";
import { FLASH_DATA, Intro, Outro, ChapterLink } from './constants';
import { MainScene_SpecialPick } from "./Composition_SP";
import { IntroScene } from "./Composition_Intro";
import { backMusictitle } from "./constants";
import { OC_CARD_DATA } from "./constants";
import { RT_CARD_DATA } from "./constants";
import { VC_IC_CARD_DATA } from "./constants";
import { SP_CARD_DATA } from "./constants";
// import { FlatESLint } from "eslint/use-at-your-own-risk";

const flashTime = Math.ceil(FLASH_DATA.length / 3) * (5 * 30) + 30;

const BackMusicShow = ({ }) => {
  return (
    <div
      style={{
        color: 'white',
        fontSize: 32,
        fontFamily: 'SourceHanSansSC',
        fontStyle: 'italic',
        left: 3,
        top: 3,
      }}>
      {backMusictitle}
    </div>
  );
};

export const CombinedVideo: React.FC = () => {


  const slicedData = [];
  for (let i = 0; i < FLASH_DATA.length; i += 3) {
    slicedData.push(FLASH_DATA.slice(i, i + 3));
  }
  return (
    <Series>
      {/* 第零段：Intro */}
      <Series.Sequence durationInFrames={Intro}>
        <IntroScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={ChapterLink + 30}>
        <SceneLink_Chap0 />
      </Series.Sequence>
      {/* 第一段：[OC] */}
      <Series.Sequence durationInFrames={(OC_CARD_DATA[0].timestampEnd - OC_CARD_DATA[0].timestampStart) * 30}>
        <MainScene data={OC_CARD_DATA[0]}>
        </MainScene>
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={90}>
        <MainSceneLink />
      </Series.Sequence>

      <Series.Sequence durationInFrames={(OC_CARD_DATA[1].timestampEnd - OC_CARD_DATA[1].timestampStart) * 30}>
        <MainScene data={OC_CARD_DATA[1]}>
        </MainScene>
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <MainSceneLink />
      </Series.Sequence>

      <Series.Sequence durationInFrames={(OC_CARD_DATA[2].timestampEnd - OC_CARD_DATA[2].timestampStart) * 30}>
        <MainScene data={OC_CARD_DATA[2]}>
        </MainScene>
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <MainSceneLink />
      </Series.Sequence>

      <Series.Sequence durationInFrames={(OC_CARD_DATA[3].timestampEnd - OC_CARD_DATA[3].timestampStart) * 30}>
        <MainScene data={OC_CARD_DATA[3]}>
        </MainScene>
      </Series.Sequence>


      {/* 第二段：[RT] */}
      <Series.Sequence durationInFrames={ChapterLink + 30}>
        <SceneLink_Chap1 />
      </Series.Sequence>

      <Series.Sequence durationInFrames={(RT_CARD_DATA[0].timestampEnd - RT_CARD_DATA[0].timestampStart) * 30}>
        <MainScene data={RT_CARD_DATA[0]}>
        </MainScene>
      </Series.Sequence>
      {/* 第三段：[VC][IC] */}
      <Series.Sequence durationInFrames={ChapterLink + 30}>
        <SceneLink_Chap2 />
      </Series.Sequence>

      <Series.Sequence durationInFrames={(VC_IC_CARD_DATA[0].timestampEnd - VC_IC_CARD_DATA[0].timestampStart) * 30}>
        <MainScene data={VC_IC_CARD_DATA[0]}>
        </MainScene>
      </Series.Sequence>

      <Series.Sequence durationInFrames={90}>
        <MainSceneLink />
      </Series.Sequence>

      <Series.Sequence durationInFrames={(VC_IC_CARD_DATA[1].timestampEnd - VC_IC_CARD_DATA[1].timestampStart) * 30}>
        <MainScene data={VC_IC_CARD_DATA[1]}>
        </MainScene>
      </Series.Sequence>
      {/* 第四段：[DW] */}
      <Series.Sequence durationInFrames={ChapterLink + 30}>
        <SceneLink_Chap3 />
      </Series.Sequence>

      <Series.Sequence durationInFrames={flashTime}>
        <MainScene_Flash />
        <BackMusicShow />
      </Series.Sequence>
      {/* 第五段：SP + Outro */}
      <Series.Sequence durationInFrames={ChapterLink + 30}>
        <SceneLink_SP />
      </Series.Sequence>

      <Series.Sequence durationInFrames={(SP_CARD_DATA[0].timestampEnd - SP_CARD_DATA[0].timestampStart) * 30 + Outro}>
        <MainScene_SpecialPick data={SP_CARD_DATA[0]}>
        </MainScene_SpecialPick>
      </Series.Sequence>


    </Series>
  );

};

export function getTotalTime() {

  let oc_video_time = 0, rt_video_time = 0, vc_ic_video_time = 0, sp_video_time = 0;
  for (var i = 0; i < OC_CARD_DATA.length; ++i) {
    oc_video_time += (OC_CARD_DATA[i].timestampEnd - OC_CARD_DATA[i].timestampStart);
  }

  for (var i = 0; i < RT_CARD_DATA.length; ++i) {
    rt_video_time += (RT_CARD_DATA[i].timestampEnd - RT_CARD_DATA[i].timestampStart);
  }

  for (var i = 0; i < VC_IC_CARD_DATA.length; ++i) {
    vc_ic_video_time += (VC_IC_CARD_DATA[i].timestampEnd - VC_IC_CARD_DATA[i].timestampStart);
  }

  sp_video_time = SP_CARD_DATA[0].timestampEnd - SP_CARD_DATA[0].timestampStart;

  let videoTime = (oc_video_time + rt_video_time + vc_ic_video_time + sp_video_time) * 30;

  let LinkTime = (ChapterLink + 30) * 5;

  LinkTime += (OC_CARD_DATA.length - 1) * 90;
  LinkTime += (RT_CARD_DATA.length - 1) * 90;
  LinkTime += (VC_IC_CARD_DATA.length - 1) * 90;

  return Intro + videoTime + flashTime + LinkTime + Outro - 100;
}
