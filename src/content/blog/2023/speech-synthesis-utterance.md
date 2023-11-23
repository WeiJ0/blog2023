---
pubDatetime: 2023-03-03T09:17:00
title: 網頁載入時自動朗讀內容 - 使用 SpeechSynthesisUtterance
postSlug: speech-synthesis-utterance
featured: true
draft: false
tags:
  - javascript
  - Web Speech API
  - speechSynthesis
ogImage: ""
description: 最近有接到一個 case 是要在網頁載入後，自動朗讀內文的內容，最後使用 JS 內建的 SpeechSynthesisUtterance 來達成這個需求。順便記錄一下遇到的問題，像是換頁不會自行中斷及手機無法自動朗讀等問題。
---

## Table of contents

## 前言

最近有接到一個 CASE 需求是在網頁載入後，網頁能自動朗讀內文的內容，最後使用 JS 內建的 SpeechSynthesisUtterance 來達成這個需求。順便記錄一下遇到的問題。

## SpeechSynthesisUtterance

原本以為要自動朗讀得透過什麼第三方套件或 API 來達成，結果搜尋了一下原來瀏覽器就內建有這個功能可以使用。
它是一個蠻老牌的功能，但因為太少需求使用以及瀏覽器本身都有提供朗讀的功能，所以完全不曉得。

## 相容性

透過 MDN 的資料 [MDN - SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) 來看
除了 `IE` 還有在 `Android 上的 webview 及 Opera`不相容外，主流瀏覽器都可以正常使用。

## 使用

SpeechSynthesisUtterance 是 window 的一個物件，可以直接使用 `window.SpeechSynthesisUtterance`，屬性有以下幾種

- lang : 語言，如果未設定將會抓 html 上設定的 `lang` 屬性。
- pitch : 音調，值為 0 ~ 2，預設為 1。
- rate : 速度，值為 0.5 ~ 2，預設為 1。
- volume : 音量，值為 0 ~ 1，預設為 1。
- text : 要朗讀的內容
- voice : 聲音，預設為瀏覽器的預設聲音，可以透過 `speechSynthesis.getVoices()` 來取得所有可用的聲音。

```js
const voices = window.speechSynthesis.getVoices();
```

這邊得到的 voices 是一個陣列，裡面包含了所有可用的聲音，內容會依照瀏覽器不同有所差異

> 相關的配置可以透過 [August 大寫的網頁](https://letswritetw.github.io/letswrite-speech_synthesis_utterance-api/)來交叉測試

## 相關的事件

- onstart : 開始朗讀時觸發
- onend : 朗讀結束時觸發
- onerror : 朗讀錯誤時觸發
- onpause : 朗讀暫停時觸發
- onresume : 朗讀繼續時觸發

## 相關的方法

- speak() : 開始朗讀
- pause() : 暫停朗讀
- resume() : 繼續朗讀
- cancel() : 取消朗讀
- getVoices() : 取得所有可用的聲音

## 專案的需求

這邊專案的需求是在網頁載入後，自動朗讀內文的內容。 所以是透過 `window.onload` 來達成

```js
function speak(content) {
  const utterance = new SpeechSynthesisUtterance();
  // 配置可以寫在這
  // utterance.lang = 'zh-TW';
  // utterance.pitch = 1;
  // utterance.rate = 1;
  // utterance.volume = 1;
  utterance.text = content;
  window.speechSynthesis.speak(utterance);
}

window.onload = function () {
  speak("這是要朗讀的內容");
};
```

到這邊儲存後重新整理進入網頁時，就會自動朗讀內容，也因為沒有指定 voice 所以會用預設的聲音朗讀  
原本以為這樣就可以打完收工，後來才發現會有一堆問題：

### 1. 切換網頁時，還在繼續朗讀

更詳細的查資料才發現，原來 `speechSynthesis` 是可以放入多個 `SpeechSynthesisUtterance`，進行佇列，也不受網頁切換的影響會將原本的內容朗讀完，因次需要在切換網頁時，取消掉原本的內容。

```js
window.onbeforeunload = function () {
  window.speechSynthesis.cancel();
};
```

### 2. 手機上不能自動朗讀

這邊是因為手機上的瀏覽器都會有一個 `user gesture` 的機制，也就是說必須要有使用者的行為才能觸發，所以在手機上是無法自動朗讀的。

原本還異想天開設定一個隱藏的 button 在載入時自動觸發，但後來發現也是無法自動朗讀，於是在手機上就只能提供一個朗讀的按鈕讓使用者自行觸發。

---

以上在實作時也有參考下列的文章：

- [MDN - SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
- [JS30-Day23-Speech Synthesis](https://ithelp.ithome.com.tw/articles/10196799)
- [SpeechSynthesisUtterance 讓瀏覽器說話](https://www.letswrite.tw/speech-synthesis-utterance/)
