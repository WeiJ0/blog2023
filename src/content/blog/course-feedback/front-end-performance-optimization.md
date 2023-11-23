---
pubDatetime: 2023-04-09T08:00:00
title: 多奇教育訓練 - 前端效能調校實戰：使用 Lighthouse 改善你的網站瀏覽體驗
postSlug: course-feedback-front-end-performance-optimization
featured: false
draft: false
tags:
  - 課後心得
ogImage: "/assets/blog/course-feedback/front-end-performance-optimization.webp"
description: 之前在工作上常常會被問到網站是否能加快速度，網路上資源實在是五花八門，看了各篇相關資訊後，覺得吸收度實在不佳，都是針對內文的項目一筆一筆做調整，但總體而言沒有一個完整的概念以及可以提出有依據的解決結果回報。
---

![cover](/assets/blog/course-feedback/front-end-performance-optimization.webp)

## 為何會上這門課

之前在工作上常常會被問到網站是否能加快速度，網路上資源實在是五花八門，看了各篇相關資訊後，覺得吸收度實在不佳，都是針對內文的項目一筆一筆做調整，但總體而言沒有一個完整的概念以及可以提出有依據的解決結果回報。

也可能是搜尋了太多優化效果被 Facebook 知道了，所以廣告就被推薦了這門 [前端效能調校實戰：使用 Lighthouse 改善你的網站瀏覽體驗](https://www.duotify.com/Training/Detail/289) 的課程。

課程講者是 [Will 保哥](https://www.facebook.com/will.fans)，之前很常瀏覽他的 Blog 及相關影片，對保哥實在實屬佩服，不知道到底哪來那麼多時間可以研究這麼多東西。而這次也是課程的第二梯次，看到第一梯次大家的心得都很不錯，所以就報名了。

## 課程內容

在課程上，首先先說明了偵測網站效能的各種工具，包含 Lighthouse、PageSpeed 等等，並且說明了這些工具的差異，以及如何使用這些工具來偵測網站效能。

這些內容其實在網路上早就屢見不鮮了，但在保哥濃縮再濃縮之下，讓我們可以更快的把一些生硬的專有名詞嚥下。像是 Web Vitals 的 `LCP`、`FID`、`CLS`、`TTFB`、`TBT` 等等，也針對上述的指標提供了優化的範例實作，包含圖片、CSS、JavaScript 的優化等等。

除了偵測工具之外，也介紹了一些關於網路層面的知識，這些都是從上面工具上報告中看不出來的，但卻是影響網站效能的重要因素。

最後，保哥也實際示範了如何使用這些工具來偵測網站效能，並且提出了一些解決方案，包含其他學員提供的網站，以及保哥自己的網站，透過 Live Demo 加上講解，讓我們可以更了解如何解決這些問題。

## 課程資源

在課前保哥也提供了課程的講義，居然高達 98 頁，而且幾乎每頁都是精華，除了課程帶到的重點，還有一些`範例實作`和`國外的各種相關文獻整理`。也提供了`課程錄影重複觀看三個月`。

![](/assets/blog/course-feedback/front-end-performance-optimization-2.webp)

另外還有 Facebook 的社團可以在裡面進行 Q&A，這些資源都是免費的，真的是非常感謝保哥。

![](/assets/blog/course-feedback/front-end-performance-optimization-3.webp)

## 課後心得

在結束了課程後，我覺得這門課程真的是非常值得的，除了上述的知識外，也提供了一些基本 CSS JS 知識，這些都是能在課後回去就馬上使用改善的，像是：

- script 的優化載入

  ```html
  <!-- 立即載入 -->
  <script src="./x.js"></script>
  <!-- 延遲載入 -->
  <script src="./x.js" async></script>
  <!-- 非同步載入 -->
  <script src="./x.js" defer></script>
  <!-- 延遲並非同步載入 -->
  <script src="./x.js" defer async></script>
  ```

- google font 的載入優化

  一般的的載入方式，但中文的字體實在是太大了，多少會影響網站的效能。

  ```html
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;400;700&display=swap"
    rel="stylesheet"
  />
  ```

  可以透過 `&amp;text=當前頁面部重複文字`，來做到只載入當前頁面需要的字體，減少 request 回傳的檔案大小。

  ```js
  // 取得當前頁面的文字，並去除空白、換行符號
  const text = document.body.innerText.replace(/\s+/g, "");
  // 透過 Set 去除重複的文字
  const uniqueText = [...new Set(text.split(" "))].join("");
  // 透過創建 link 加入到 head ，來讓瀏覽器提前載入字體
  const link = document.createElement("link");
  link.href = `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;400;700&amp;text=${uniqueText}`;
  link.rel = "stylesheet";
  link.preload = true;
  document.head.appendChild(link);
  ```

---

而按照我課前的需求，我已經可以透過 Lighthouse 或是 PageSpeed 提供一份有依據的報告，並且提出解決方案及最後的 before/after 效果。

另外課程簡直就是 Develop Tool 的大補帖，之前也想過要花一點時間來研究 Chrome 的 Develop Tool，但現在完全可以省下來了，最受惠的莫過於是 Overrides 的功能，可以直接修改 CSS、JavaScript 等等進行測試，真的是非常方便。

![](/assets/blog/course-feedback/front-end-performance-optimization-4.webp)
