---
pubDatetime: 2024-03-17T01:25:00
title: textarea 的 placeholder 未在畫面上正常顯示
postSlug: textarea-placeholder-not-show
featured: false
draft: false
tags:
  - css
  - textarea
ogImage: ""
description: textarea 的 placeholder 未在畫面上正常顯示，原因是因為 textarea 的內容有換行或者是空白，所以 placeholder 未正常顯示。
---

## 前言

最近很常踩到這種很基礎的坑，剛好有一個專案是用 `pug` 來寫的，然後在寫 `textarea` 的時候發現 `placeholder` 屬性沒有正常顯示在畫面上，經過一番查詢後發現是因為 `pug` 的縮排問題。導致了 `textarea` 的 `placeholder` 屬性沒有正常顯示。

在 html 中 `<textarea></textarea>` 若有換行或者是空白的話，會被當作 `textarea` 的內容，所以就不會有 `placeholder` 的效果。

```html
<textarea placeholder="請輸入內容">
</textarea> <!-- 已有換行內容不會顯示 placeholder -->

<textarea placeholder="請輸入內容"> </textarea> <!-- 已有空格不會顯示 placeholder -->

<textarea placeholder="請輸入內容"></textarea> <!-- 正常顯示 placeholder -->
```

## 解決方法

但詳細測試了一下無論怎麼調整 `pug` 的語法還是會縮排導致 placeholder 沒辦法正常被顯示，但我覺得應該是我專案是使用 gulp-pug 執行導致，所以不浪費時間改使用了 javascript 讓 textarea 在頁面載入時自動將 value 清除，這樣就可以避免了這個問題。

```js
const textarea = document.querySelectorAll('textarea');
if(textarea.length){
    textarea.forEach((el) => {
        el.value = '';
    });
}
```