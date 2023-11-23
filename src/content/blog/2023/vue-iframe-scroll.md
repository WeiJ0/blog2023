---
pubDatetime: 2023-02-23T15:17:00
title: 使用 Vue 監聽 iframe 的滾動事件
postSlug: vue-ifame-scroll
featured: false
draft: false
tags:
  - vue
  - iframe
ogImage: ""
description: Vue專案中嵌入 iframe，需要監聽滾動事件實現需求。文章分享了使用原生 JS 監聽 iframe 滾動事件的方法，透過ref取得DOM元素，使用 contentDocument 獲取 iframe 的 DOM 元素，再透過 addEventListener 監聽 scroll 事件。判斷是否滾動到底部的機制以 iframe 的高度、滾動高度、可視高度為參考，並在 Vue 組件中實現相應邏輯。針對一些可能遇到的問題，如部分 iframe 未監聽到滾動事件、Android 取不到 iframe 的相關屬性、特定瀏覽器滾動到底部未觸發事件，提供了解決方案。加強滾動事件的穩定監聽，確保按鈕在滾動到底部時正確觸發，提升用戶體驗。
---

## 前言

最近有一個專案，是把注意事項獨立出一個 html 在崁入到主頁面中。需求是滾動完整個 iframe 在顯示再一步，所以需要監聽該滾動事件。
那因為 vue 本身是沒有監聽 iframe 的滾動事件，所以需要使用原生的 js 來監聽。

## 監聽 iframe 的滾動事件

監聽 iframe 的 scroll 事件，這邊是用 `ref` 的方式來取得 DOM 元素，並且使用 `contentDocument` 來取得 iframe 的 DOM 元素。

並監聽 `scroll` 事件，這邊是用 `addEventListener` 來監聽，因為 `@scroll` 這種方式是無法監聽到 iframe 的滾動事件。

要判斷是否滾動到最底部，判斷的方法是

> iframe 的高度 - iframe 的滾動高度 === iframe 的可視高度

```html
<iframe ref="notice" src="..." />
<button type="button" :disabled="!isScrollBottom">下一步</button>
```

```js
data() {
    return {
        isScrollBottom: false
    }
},
methods:{
    listenScroll() {
        const vm = this;
        vm.$refs.notice.contentDocument.addEventListener('scroll', (e) => {
            const iframeBody = vm.$refs.notice.contentDocument.body;
            const isScrollBottom =
                (iframeBody.scrollHeight - iframeBody.scrollTop)
                === iframeBody.clientHeight;

            if (isScrollBottom) {
                vm.isScrollBottom = true;
            }
        });
    }
},
```

## iframe 未監聽到滾動事件

有遇到少部分的 iframe 未監聽到滾動事件，可能是因為 iframe 為動態載入，建議可以在監聽事件前在加上監聽載入完成的事件

```js
vm.$refs.notice.addEventListener('load', () => {
    vm.$refs.notice.contentDocument.addEventListener('scroll', (e) => {
        ...
    });
});
```

## 部分舊的 android 取不到 iframe 的 scrollHeight 、scrollTop 、clientHeight

在使用 iframe.contentDocument.body 前，我是使用 contentWindow 來做，確實在 chrome 上可以正常取得，但部份的手機瀏覽器卻讀不出該值，所以改用 contentDocument.body 來取得。

## 部分瀏覽器在滾動最底部時沒有觸發事件

為了避免部分瀏覽器的差異，我再程式最後加了 50 的高度，可以保證滾動到一個程度時該程式可以正常做觸發。當滾動到離最底部 50px 時，就可以觸發下一步的按鈕。

```js
const isScrollBottom =
  iframeBody.scrollHeight - iframeBody.scrollTop < iframeBody.clientHeight + 50;

if (isScrollBottom) {
  vm.isScrollBottom = true;
}
```
