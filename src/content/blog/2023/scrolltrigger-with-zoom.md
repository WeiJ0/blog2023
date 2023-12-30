---
pubDatetime: 2023-12-30T16:44:00
title: 在 body 使用 zoom 時解決 GSAP ScrollTrigger 的觸發點不正確問題
postSlug: scrolltrigger-with-zoom
featured: false
draft: false
tags:
  - gsap
  - javascript
ogImage: ""
description: 如何解決在使用 GSAP ScrollTrigger 與 zoom 一起時，觸發點可能出現的問題。我們將透過 scrollerProxy 方法調整觸發點的位置，確保在不同尺寸裝置上的正確顯示。
---

## 前言

最近有一個專案，因為客戶的特殊需求，RWD 為了能在不同尺寸的裝置能保有原始設計稿的排列，需要使用 zoom 的方式來實作，但在使用 zoom 的時候，發現 GSAP ScrollTrigger 的觸發點會有問題，所以這篇文章就來記錄一下解決的方式。

## 問題

問題出在使用 zoom 的時候，雖然將整個頁面都縮小了，但實際的高度並沒有改變，所以在使用 ScrollTrigger 的時候，會發現觸發點會有問題，例如原本的觸發點是在畫面中間，但因為 zoom 的關係，觸發點在同樣的位置，但在畫面上反而偏下方，這樣就會造成觸發點不正確的問題。

## 解決方式

最後在 ScrollTrigger 的文件中有找到 `scrollerProxy` 這個 method，可以調整觸發點的位置，所以就可以透過這個 method 來解決這個問題。

```javascript
const bodyZoom = getComputedStyle(document.body).zoom || 1;
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop / bodyZoom; // 這邊要除以 zoom調整觸發點的位置
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});
```
