---
pubDatetime: 2023-04-07T13:17:00
title: Intersection Observer - 換個方式來做滾動特效
postSlug: intersection-observer
featured: true
draft: false
tags:
  - javascript
  - Web API
ogImage: "/assets/blog/ai-learning/intersection-observer-cover.webp"
description: 深入介紹了 Intersection Observer，透過這個 API，你可以輕鬆實現滾動相關效果，例如圖片延遲載入、無限滾動、元素淡入淡出等。如何使用 Intersection Observer 監測元素進入或離開視窗，觸發相對應的事件。除了提供基本的功能，API還支援多種參數調整，包括 root、rootMargin、threshold 等，使你更精準地控制元素的觸發時機。
---

## 前言

在以前如果要做到滾動相關效果，第一個一定會想到 GSAP WOW AOS 這類的套件，Intersection Observer 出現了也一段時間，但一直沒有去真的了解它，現在透過 AI 來學習。

## Intersection Observer

`Intersection Observer` 是一個用來監測元素是否進入或離開視窗的 API，透過這個 API 也可以做到圖片延遲載入、無限滾動、還有元素淡出淡入的效果。

## HTML

程式中 .box 的元素只是做一個假高，讓網頁需要滾動才能看到效果。當目前的可視範圍進入或離開 .fade-in 的元素時，就會觸發事件。

```html
   <style>
      *{
        margin: 0;
        padding: 0;
      }
      .box{
        background-color: burlywood;
        height: 100vh;
        width: 100%;
      }
      .fade-in {
        opacity: 0;
        transition: opacity 1s ease-in-out;
      }
      .fade-in p{
        margin: 1rem;
        font-size: 2rem;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
    <div class="fade-in">
      <p>出現就會顯示，離開就會隱藏</p>
    </div>
    <div class="box"></div>
  </body>
```

首先需要建立一個新的 `IntersectionObserver` 並用 使用 `observe()` 來監聽元素，並且需要傳入一個 callback function，這個 function 會在元素進入或離開視窗時被觸發，並且會傳入一個 entries 的參數代表目前是否在可視範圍之中。

```js
const fadeIns = document.querySelectorAll(".fade-in"); // 取得所有要淡入淡出的元素

const fadeInObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 如果元素進入螢幕範圍
      entry.target.style.opacity = "1"; // 顯示元素
    } else {
      // 如果元素離開螢幕範圍
      entry.target.style.opacity = "0"; // 隱藏元素
    }
  });
});

// 監聽所有要淡入淡出的元素
fadeIns.forEach(fadeIn => {
  fadeInObserver.observe(fadeIn);
});
```

<iframe height="500" style="width: 100%;" scrolling="no" title="intersection-observer" src="https://codepen.io/weij0/embed/RwewvqJ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/weij0/pen/RwewvqJ">
  intersection-observer</a> by Aiden (<a href="https://codepen.io/weij0">@weij0</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

而除了預設的效果外，API 也提供了很多相關的參數可以做調整，可以讓我們更精準的控制元素的觸發時機。

- `root` 可以指定要監聽的範圍，預設是 `window`，
- `rootMargin` 則是用來調整監聽範圍的大小，可以是正數或負數，單位是像素。
- `threshold` 則是用來調整觸發的時機，預設是 0，也就是當元素進入可視範圍時就會觸發，如果設定為 1，則是當元素完全進入可視範圍時才會觸發，用來指定觀察的元素與 root 的交集比例。

```js
const options = {
  root: document.querySelector("#scrollArea") // 參考元素,
  rootMargin: "10px",
};

const observer = new IntersectionObserver(callback, options);
```

## 感想

實際透過範例走過一次後發現的確不是很困難，只不過相較於 GSAP 的 ScrollTrigger 來說，GSAP 提供較完整的方法屬性可以做選擇，而 Intersection Observer 則是只提供了一個基本的功能，如果要做到更多的效果，還是需要自己去實作。

## 參考資料

- [Intersection_Observer_API - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)
