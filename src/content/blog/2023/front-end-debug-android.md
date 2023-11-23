---
pubDatetime: 2023-03-09T09:50:00
title: 在 Android 上使用 Chrome DevTools
postSlug: front-end-debug-android
featured: false
draft: false
tags:
  - debug
  - android
ogImage: ""
description: 學會在電腦和手機的 Chrome 上進行連接並啟用開發者工具進行前端除錯。文章詳細解說開啟 Android 開發人員選項和 USB 偵錯的步驟，包括Android不同版本的路徑。提供注意事項，例如開啟USB偵錯可能影響部分銀行APP和行動支付使用。教你如何連接電腦，並在Chrome或Edge中使用 chrome://inspect/#devices或 edge://inspect/#devices 檢查手機連線，允許授權後即可透過開發者工具進行偵錯。展示使用開發者工具元素 (element) 功能在手機上查看結果、CSS 樣式和即時調整切版，提高前端開發效率。
---

## 前言

在 [常用的幾個前端 debug 方式筆記](/posts/front-end-debug) 中有紀錄透過開發者工具來做除錯的幾個方式，但往往在電腦上測試沒問題
但到手機上就會出現一些意料外的狀況，這篇則紀錄如何用電腦和手機的 chrome 做連接並開啟開發者工具來做除錯。

## 開啟 Android 開發人員選項功能

首先要先開啟 Android 開發者功能，Android 4.2 過後都需要手動開啟

多數手機步驟如下:

1. 打開設定
2. 點選關於手機
3. 點選版本號碼 7 次
4. 看到跳出 `您現在已經是開發人員` 訊息即可

> 若操作上述步驟後沒有跳出訊息，請參考 [設定裝置端開發人員選項 - Android Developers](https://developer.android.com/studio/debug/dev-options?hl=zh-tw)

## 開啟 USB 偵錯

接著進入到 `設定 > 開發人員選項` 中，開啟 `USB 偵錯` 功能

開發人員選項的路徑會依照 Android 版本、手機廠牌不同而有所差異，大致上分為幾個

- Android 7.0 以下
  - 設定 > 開發人員選項
- Android 8.0.0 & 8.1.0
  - 設定 > 系統 > 開發人員選項
- Android 9 以上
  - 設定 > 系統 > 進階 > 開發人員選項

USB 偵錯功能主要讓電腦能透過 USB 來讀取手機上的資料，也包含像是 chrome。

 <span style="color: red; font-weight: bold">
   若非必要建議不要開啟，也有部分銀行 APP & 行動支付會檢查是否開啟，若開啟會無法使用。
 </span>

## 連接電腦並允許授權

目前大部分 Android 廠牌皆不用驅動軟體就能直接與電腦進行連線，只要電腦有偵測到手機連線後就可以透過 Chrome 或 Edge 開啟下列網址

[chrome://inspect/#devices](chrome://inspect/#devices)  
[edge://inspect/#devices](edge://inspect/#devices)

進入到檢查頁面時，若手機有正常連線就會跳出 `允許授權` 的視窗，點選 `允許` 後重新整理檢查頁面，就會看到手機的資訊，包含有哪些 APP 可以做偵錯

![](/assets/blog/front-end-debug/debugger-android.jpg)

像畫面中就有 brave 和 chrome，這邊就使用 chrome 來做偵錯，點選分頁的 `inspect` 就會跳出開發者工具進行 debug，功能和在電腦上一模一樣。

而透過電腦開發者工具`元素 (element)`，的功能，可以直接在手機上看到結果以及實際的 css 樣式。也可以透過開發者工具修改在手機上預覽，在切版除錯上是一個非常好用的功能。

![](/assets/blog/front-end-debug/debugger-android-2.jpg)
