---
pubDatetime: 2024-03-07T21:00:00
title: ul 預設的樣式被 reset.css 取消，補上 list-style 也沒用
postSlug: css-ul-style-disappear
featured: false
draft: false
tags:
  - css
ogImage: ""
description: ul 的預設樣式被 reset.css 所覆蓋，導致無法顯示項目符號，將 list-style:disc 補上後仍沒有出現，最後發現是 padding 的問題
---

## 前言

最近有一個專案是有後台功能的，後台會有文字編輯器可以調整字體大小顏色...等等，但是在使用項目符號 (ul) 的時候發現前台沒有顯示出來，經過一番查詢後發現是再切版的過程中有使用 `reset.css`，市面上的 reset 應該都有將 ul 的樣式取消 `list-style:none`，所以在使用 ul 的時候就沒有項目符號了。

## 解決方法

依照上面的思路，應該就在 css 中把 ul 的樣式設定回來 `list-style: disc` 就解決了，結果還是沒有出現。

![css-ul-style-disappear01](/assets/blog/css-ul-style-disappear/css-ul-style-disappear01.webp)
一開始完全沒找到頭緒，沒有 inline-style、沒有其他 css 權重蓋過，換其他瀏覽器也是一樣，後來只好開了一個空白的環境來做比對

最後發現是 padding 的鍋，ul 預設會有 `padding-left` 讓左邊的空間來顯示項目符號的位置，但是在 reset.css 中有設定全部項目 `padding: 0`，所以導致了項目符號沒有顯示出來。

於是再把 ul 的樣式設定回來 `padding-left` 就解決了。 這是一個非常簡單，但一開始會毫無頭緒的問題。


![css-ul-style-disappear02](/assets/blog/css-ul-style-disappear/css-ul-style-disappear02.webp)