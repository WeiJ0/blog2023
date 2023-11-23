---
pubDatetime: 2023-04-07T09:17:00
title: EventSource - 實作一個 ChatGPT 打字機效果
postSlug: event-source
featured: true
draft: false
tags:
  - javascript
  - Web API
ogImage: "/assets/blog/ai-learning/event-source-cover.webp"
description: 探索使用ChatGPT實現打字機效果的神奇之旅！發現透過 「EventSource」 實現 Server-Sent Events (SSE)技術，使瀏覽器和伺服器建立即時單向通信。不僅基於 Http 協議使用純文字傳遞，相比 Socket 更為簡便，且具備即時性、高相容性、網路斷開時可重新連接等優勢。深入了解客戶端和伺服器端的實現方式，並特別留意伺服器端的文字格式約定。透過 Node Express 實現伺服器端模擬，以文字內容創建引人入勝的演示效果。
---

## 前言

從開始使用 ChatGPT 開始就有一個疑問，這種透過 request 的方式是如何做到打字機效果，天真的我以為是將 response 的文字拉回來後再慢慢呈現，發來仔細看才發現，又有新東西可以學了。雖然這東西已經誕生好久好久了 - EventSource

## EventSource

`EventSource` 是一個函式庫，它可以讓你使用 Server-Sent Events (SSE) 技術，讓瀏覽器和伺服器建立單向的即時溝通，基於 Http 的協定使用文字格式作為傳遞，相比 Socket 簡單多了，其他的優點如下：

- 即時性: 當瀏覽器接到 Server 新的回傳就可以馬上做觸發。
- 相容性高: 目前主流瀏覽器都可以支援，例如 Chrome Edge Firefox Safari 。
- 重新連接: 如果遇到網路斷開時可以進行重新連接，不像一般的 request 只有一次性。

## 瀏覽器端

在 html js 的部份需要建立一個 `EventSource` 物件，並且監聽 message 事件

```html
<div id="output"></div>
```

```js
const source = new EventSource("網址");
source.addEventListener(
  "message",
  function (e) {
    document.getElementById("output").innerHTML += e.data + " ";
  },
  false
);
```

在伺服器回傳新的內容時，就會觸發 message 事件，並且將內容加入到 #output 元素中

## 伺服器端

而在伺服器端的部分，因為是純文字格式，所以在傳輸上有做格式限制，為冒號開頭像是

```text
event: <event-name>
data: <event-data>
id: <event-id>
retry: <milliseconds>
```

- event：表示事件名稱，可以是任何自定義的字符串。
- data：表示事件數據，可以是任意文本內容，但必須以 \n 結尾。
- id：表示事件 ID，可以用於在客戶端實現重連功能。
- retry：如果連接中斷，客戶端會在一定時間後重新建立連接，retry 字段指定此時間間隔，單位為毫秒。如果省略此字段，客戶端會使用原來的重連時間。

<span style="color: red; font-weight: bold">特別需要注意每個訊息間都需要用 \n\n 來做分隔，否則瀏覽器端可能沒辦法做正確的辨識。</span>

在伺服器的部分使用 node Express 來模擬，需要設定 header 的部份為 `text/event-stream` 及 `connection keep-alive`，接著在程式中我引用一段假文，並用空白切割為陣列，再每秒回傳一個單字，直到所有單字都回傳完畢。

```js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/chat", function (req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const textArray = text.split(" ");
  let textIndex = 0;

  let e = setInterval(() => {
    if (textIndex === textArray.length) {
      clearInterval(e);
      res.end();
      return;
    }

    const data = `data: ${textArray[textIndex]}\n\n`;
    res.write(data);
    textIndex++;
  }, 1000);

  req.on("close", () => {
    console.log("Client closed SSE connection");
    clearInterval(e);
    res.end();
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
```

## Demo 效果

![](/assets/blog/ai-learning/event-source.gif)

## 感想

以往在程式碼的部分可能都需要兜好幾個文件、文章來拼拼湊湊才能做出一個 demo，不過有了 AI 之後只有幾個 prompts 就可以完成，程式碼的方面基本上也都沒問題，只有少數要進行修改，再來就來看看 demo 的效果吧
