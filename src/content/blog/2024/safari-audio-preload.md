---
pubDatetime: 2024-04-29T21:02:00
title: safari 使用 audio tag 後讀取異常緩慢問題
postSlug: safari-audio-preload
featured: false
draft: false
tags:  
  - safari
  - audio
ogImage: ""
description: 最近遇到一個案子是廣播電台，並在頁面中使用 audio 來播放 audio/mpeg 檔案，在電腦及安卓上正常，在 safari 系列卻一直無法載入
---

## 前言

最近遇到一個案子是廣播電台，並在頁面中使用 audio 來播放 audio/mpeg 檔案，在電腦及安卓上正常，在 safari 系列卻一直無法載入。

經過開發者工具查看後發現非 safari 的瀏覽器在載入 audio 時不會等到檔案載入完成再繼續渲染，所以不會有卡在畫面的問題，而 safari 會先將檔案完全載入後再播放，這導致了在載入 audio 時會有一段時間的等待，而這段時間的等待會讓使用者感覺到網頁讀取緩慢。

## 解決方法

解決方法是將 audio 的 preload 設定為 `none`，這樣就可以讓 safari 在載入 audio 時不會等到檔案完全載入再繼續渲染，而是在載入 audio 時就直接繼續渲染頁面。

**這邊需要設定 `none` 才行**，如果只是刪除該屬性，safari 預設會是 `metadata`，這樣還是會等到檔案載入完成再繼續渲染。

```html
<!-- 原本是 metadata，刪除屬性預設還是指定 metadata -->
<audio controls="controls" preload="metadata">
    <source src="xxxx" type="audio/mpeg" />
</audio>

<!-- 改成 none 後不會阻擋渲染 -->
<audio controls="controls" preload="none">
    <source src="xxxx" type="audio/mpeg" />
</audio>
```