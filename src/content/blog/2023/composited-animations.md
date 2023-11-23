---
pubDatetime: 2023-04-13T09:17:00
title: 瀏覽器上的合成動畫及非同合成動畫
postSlug: composited-animations
featured: false
draft: false
tags:
  - CSS
ogImage: ""
description: 合成動畫和非合成動畫對於網頁性能有著不同的影響。在低階手機或執行效能較重任務時，非合成動畫可能會出現卡頓情況，增加頁面的 Cumulative Layout Shift (CLS)，進而降低 Lighthouse Performance 的分數。為了避免這種情況，建議使用合成動畫來改變元素的位置、旋轉、縮放或透明度等屬性，並且不會觸發佈局和繪製階段。常用的合成動畫屬性包括 transform、opacity、filter、animation、transition、perspective 和 backface-visibility。此外，可以使用 will-change 屬性來提前告知瀏覽器將要改變的屬性，以減少重新觸發佈局和繪製階段，從而提高效能。然而，過度使用 will-change 屬性可能會降低瀏覽器效能，因此需要注意使用時機和移除不使用的情況。
---

## 前言

在 [LightHouse 中性能分數有一個指標](https://developer.chrome.com/zh/docs/lighthouse/performance/non-composited-animations/)是看這個網站是否使用了非合成動畫，透過這個機會來理解什麼是合成動畫，什麼是非合成動畫，以及如何避免使用非合成動畫。

## LightHouse 的說明

Non-composited animations can appear janky (not smooth) on low-end phones or when performance-heavy tasks are running on the main thread. Janky animations can increase the Cumulative Layout Shift (CLS) of your page. Reducing CLS will improve your Lighthouse Performance score.

非合成的動畫在低階的手機上或是在主執行緒上執行效能較重的任務時，可能會出現卡頓的情況，卡頓的動畫會增加頁面的 `Cumulative Layout Shift (CLS)`，減少 `CLS` 會提高 `Lighthouse Performance` 的分數。

而要了解什麼是合成動畫，什麼是非合成動畫，就要先了解瀏覽器的渲染過程。

## 瀏覽器的渲染

瀏覽器在渲染頁面的過程，主要會有以下幾個階段

1. 下載和解析 HTML, CSS, JavaScript。
2. 執行 JavaScript。
3. 計算元素的 Style
4. 建立元素 。 (佈局 Layout)
5. 將元素繪製到畫面上。
6. 合成圖層。

**前五個步驟都會在主執行緒中執行**，合成除外，合成是指將頁面的各個部分轉為類似 PhotoShop 中圖層的概念，並且將各個圖層最終合成一個圖層的技術。在這個階段中會透過 GPU 來執行，所以不會影響到主執行緒。

所以如果透過非合成動畫來改變元素的位置、旋轉、縮放或透明度等屬性，就會重新觸發瀏覽器的佈局和繪製階段 `(重繪 Repainting)`，這樣就會導致瀏覽器的效能下降，所以才會建議避免使用非合成動畫來減少主執行緒的負擔，提高使用者的體驗。

## 常用的合成動畫屬性有

- `transform`
- `opacity`
- `filter`
- `animation`
- `transition`
- `perspective`
- `backface-visibility`

## will-change

而提到動畫，就會提到 `will-change` 這個屬性，這個屬性可以讓瀏覽器提前知道你將要改變的屬性，這樣瀏覽器就會提前將這個元素的圖層合成，這樣就可以在觸發動畫時，減少重新觸發佈局和繪製階段，提高效能。

但在使用上也要特別留意以下幾點

1. 過度使用會導致瀏覽器的效能下降，雖然可能可以帶來動畫效能的提升，但相對之下也需要消耗更多的資源而帶來反效果。
2. 不要做早的使用，例如如果一開始就在元素上加上，那麼瀏覽器就會提前將這個元素的圖層合成，但如果這個元素並沒有觸發動畫，那麼就會造成效能的浪費。
3. 在不使用的時候可以移除，來避免持續造成效能的浪費。

關於第三點 MDN 上有提到，可以透過 `will-change: auto` 來移除 `will-change` 的效果。

```js
const el = document.getElementById("element");

el.addEventListener("mouseenter", hintBrowser);
el.addEventListener("animationEnd", removeHint);

function hintBrowser() {
  this.style.willChange = "transform, opacity";
}

function removeHint() {
  this.style.willChange = "auto";
}
```

## 結論

簡單來說概括如下

- 合成動畫： 透過[上述的屬性](#常用的合成動畫屬性有)來改變元素的位置、旋轉、縮放或透明度等屬性，並且**不會觸發佈局和繪製階段**。
- 非合成動畫： 透過 JS 或是其他非合成動畫的屬性來改變元素的屬性，因而**會觸發佈局和繪製階段**。

## 參考資料

- [Chrome Developers Docs- Avoid non-composited animations](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations/)
- [gtmetrix - Avoid non-composited animations](https://gtmetrix.com/avoid-non-composited-anmations.html)
- [浏览器渲染魔法之合成层](https://segmentfault.com/a/1190000041197292)
- [MDN - will-change](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change#Browser_compatibility)
