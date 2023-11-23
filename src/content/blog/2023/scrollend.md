---
pubDatetime: 2023-11-21T20:17:00
title: 結束滾動事件 - Scrollend
postSlug: js-scrollend
featured: false
draft: false
tags:
  - javascript
ogImage: ""
description: 最近需要評估一個需求，是要在滾動結束後觸發視覺效果，經過搜尋後發現有 `Scrollend` 這個事件可以使用，在此之前如果有類似需求我可能會使用 setTimeout 來做，使用上也不困難。
---

## 前言

最近需要評估一個需求，是要在滾動結束後觸發視覺效果，經過搜尋後發現有 `Scrollend` 這個事件可以使用，
在此之前如果有類似需求我可能會使用 setTimeout 來做

## 使用方法

```javascript
window.addEventListener('scroll', function() {
  clearTimeout(scrollTimer);
  
  scrollTimer = setTimeout(function() {
    console.log('滾動結束');
  }, 200);
});
```

但相較之下比較像是滾動暫停而不是結束，所以剛好能夠使用 `Scrollend` 事件來實作，使用上也不困難

```javascript
document.addEventListener("scrollend", (event) => {
  console.log('滾動結束');
});

// 或者是
document.onscrollend = (event) => {
  console.log('滾動結束');
};
```

## 注意事項

1. 不過如果在滾動時，畫面沒有做任何移動將不會進行觸發

2. 目前 Safari 並未支援 `scrollend` 所以還是得用 setTimeout 來實現

## 參考文件

[Scrollend, a new JavaScript event](https://developer.chrome.com/blog/scrollend-a-new-javascript-event/)