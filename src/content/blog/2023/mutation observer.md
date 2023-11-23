---
pubDatetime: 2023-10-29T00:17:00
title: 使用 MutationObserver 來監聽 DOM 的變化
postSlug: mutation-observer
featured: true
draft: false
tags:
  - javascript
  - Web API
description: 優化網頁互動效果！探討在使用 lenis 滾動 library 時可能遭遇的問題，特別是在處理彈跳視窗內容需要滾動的情況下。文章介紹了使用 MutationObserver API 的方法，這能夠監聽 DOM 的變化，進而達成開啟彈跳視窗時動態處理 lenis 的效果。
---

## 前言

最近在專案上有使用到 [lenis](https://lenis.studiofreight.com/) 這款平滑滾動的 libray 來加強網頁的互動效果。

而 lenis 本身會取消掉瀏覽器的滾動行為，並且自己實作滾動行為，但就會出現彈跳視窗並且內容很多需要滾動的情況下，無法滾動的情形。

而看了官方提供的 methods 需要暫時的將 lenis 做銷毀，關閉彈跳視窗後再重新初始化 lenis，雖然都可以透過 javascript 在執行彈跳視窗時進行處理，
但舊的專案中並沒有將彈跳視窗開啟的行為統一包裝在某個 function 而是散落各頁面，而修改起來也會比較麻煩，所以就想說能不能透過監聽 DOM 的變化來做處理。

而查了一下 js 相關的 API 中就發現了 [MutationObserver](https://developer.mozilla.org/zh-TW/docs/Web/API/MutationObserver) 這個 API，可以監聽 DOM 的變化。

## MutationObserver

MutationObserver 會監聽 DOM 的變化，並且可以使用 callback function 來處理變化後的行為。

使用 `observe` 來傳入 dom 以及相關的參數設定 (config) 來進行監聽。

```javascript
const domNode = document.querySelector("#node");
const observer = new MutationObserver(callback);

observer.observe(domNode, config);

observer.disconnect(); // 停止監聽
```

config 中可以設定有監聽的類別有哪些

- attributes：監聽所有屬性的變化
- attributeFilter ：監聽特定屬性的變化，要傳入陣列，例如 ['class', 'style']
- childList：監聽子節點的變化
- characterData：監聽節點內容的變化
- subtree：監聽子節點以及子節點的變化
- attributeOldValue：監聽屬性變化前的值，如果為 true 的話，callback 會傳入變化前的值
- characterDataOldValue：監聽節點內容變化前的值，如果為 true 的話，callback 會傳入變化前的值

而 MutationObserver 會回傳一個 `MutationRecord` 的物件，裡面會包含變化的資訊。

- type：變化的類型，有 attributes、characterData、childList
- target：變化的節點
- addedNodes：新增的節點
- removedNodes：移除的節點
- previousSibling：變化前的前一個節點
- nextSibling：變化前的下一個節點
- attributeName：變化的屬性名稱
- attributeNamespace：變化的屬性的命名空間
- oldValue：變化前的值

---

在我的案例中，每次開啟彈跳視窗時也會一並將 body 中的 moduleMask 一並將上 show 來顯示遮罩，所以我就可以監聽 .moduleMask 的 classList 變化來達成這個功能

```javascript
function handleLenisMask() {
  const targets = document.querySelectorAll(".moduleMask, .slideMenuMask");
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const { attributeName, target } = mutation;
      // 若是有 show 的 class 則銷毀 lenis
      if (attributeName === "class" && target.classList.contains("show"))
        lenis.destroy();
      // 若是沒有 show 的 class 則重新初始化 lenis
      else lenisInit();
    });
  });

  // 因為我是傳入多個 dom 來監聽，所以要用 forEach 來進行監聽
  targets.forEach(target => {
    observer.observe(target, {
      // 監聽 class 的變化
      attributeFilter: ["class"],
    });
  });
}
```

## 參考資料

- [MutationObserver](https://developer.mozilla.org/zh-TW/docs/Web/API/MutationObserver)
