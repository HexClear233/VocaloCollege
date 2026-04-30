# Remotion video

<p style="text-align: center;">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```


/* While, choosing Browser Render, Close Headless mode, chrome: chrome-mode-testing, click Multi-process Chrome on Linux*/
**Render video**

```console
npx remotion render


# GPU SpeedUp:
npx remotion render src/index.ts MainVideo out/final.mp4 --gl=angle --concurrency=4 --image-format=jpeg --crf=18


npx remotion render src/index.ts MainVideo out/final.mp4 --gl=angle --concurrency=4 --image-format=jpeg --crf=18

# CLI acceleration:
npx remotion render MainVideo --codec prores --hardware-acceleration if-possible
```

**Benchmark Test Result:**

9439 frames, 30 fps, with 2 videos, a few pictures and texts.
Output Video Size: 1920 × 1080

| command | acceleration choice | OutputTime | Size | Notes |
| --- | --- | --- | --- | --- |
| `npx remotion Render` | None | 9'40'' | 194.1 MB | 

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
