# VocaloCollege

Column VocaloCollege running code.

> The relevant running code of the column VocaloCollege.
> **By HexClear233** neta **EmotionEcho**, CAHU Vocalo Alliance

## Environment configuration

Python: 3.11.4 (Data Scrapy)
Node.js, Remotion (VideoMake)

├── @remotion/cli@4.0.451
├── @remotion/eslint-config-flat@4.0.451
├── @remotion/tailwind-v4@4.0.451


## Project composition

- Part1. Bvid_scrapy
- Part2. VideoMake

## Project process
1. Run Bvid_scrapy, get bvid from uidlist uploading video during `time_start` to `time_end`.
2. Dublicate the bvid list, and get xlsx file including detailed info.
3. Filt video info, get Vocaloid-relative video.
4. Seperate them into FLASHSHOW or NOT FLASHSHOW, and OC,RT,VC,IC,DW, SP.
5. Use bilibili scrapy tools, like BBDown, to get video's video, audio, covers, etc.
6. Run VideoMake module to make full video.
7. (Optional) Get videos, clone the original html file to make new file.

