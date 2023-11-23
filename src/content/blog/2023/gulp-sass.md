---
pubDatetime: 2023-04-18T17:30:00
title: 改用 node-sass 改善 dart-sass 編譯緩慢的問題
postSlug: gulp-sass
featured: false
draft: false
tags:
  - debug
  - gulp
  - sass
  - 靈異故事
ogImage: ""
description: 這幾天遇到使用 gulp-sass 編譯速度極慢的問題，原本的官方範例碼造成編譯時間在一夜之間增加至 2~3 秒。經過 chatgpt 與網路查詢後，發現 Dart Sass 取代了 node-sass，雖然更新至最新版本無效，最後死馬當活馬醫改用 node-sass 後，編譯時間卻神奇地回到 1 秒內。排除了可能的錯誤原因，最終以這個「靈異故事」收尾，繼續使用 node-sass 完成專案。
---

## 前言

這幾天有一個專案，是要產出純粹的 html、css、js ，沒有用到任何框架，所以就想到使用 gulp 來做，於是使用官方提供的範例來做 gulp-sass 這段，結果發現編譯的速度很慢，後來改改用 node-sass 來做就排除這個問題了。

## 官方範例 gulpfile.js

```js
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
```

在起初時使用上一切都正常，都還可以維持在 1 秒內編譯完成，但到了第二天編譯時間就開始來到了 2~3 秒的時間，期間已經試過重新執行 gulp 和重開機，不過沒有任何改善。

```js
[19:18:48] Starting 'watch'...
[19:18:52] Starting 'gulpScss'...
[19:18:55] Finished 'gulpScss' after 3.15 s
```

後續也把 scss 檔砍到剩下幾個內容，和起一個新的專案來測試，結果一樣，編譯時間也是 2~3 秒。於是透過 chatgpt 和上網找了一些資料，更新到最新版本 `1.62.0`，不過沒有任何改善。

後來重新看一下官網的文件，是使用 `Dart Sass` 來做編譯，並說明 `node-sass` 已經被棄用，於是就死馬當活馬醫，改用 `node-sass` 來做編譯

```
npm install node-sass
```

```js
const { watch, src, dest } = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
```

結果發現編譯時間居然回來了

```js
[19:55:47] Starting 'watch'...
[19:55:49] Starting 'gulpScss'...
[19:55:50] Finished 'gulpScss' after 485 ms
```

而觀察幾天下來，一直都維持在 1 秒內，所以有排除了是不是 gulp 或是 sass 的程式寫得不好，導致編譯時間變慢的問題。也有嘗試找一下在 sass 或是 gulp 運作時會不會產生什麼 cache 檔導致變慢，不過還是沒有所獲，所以就先用 `node-sass` 完成專案了，也算是一件靈異故事。
