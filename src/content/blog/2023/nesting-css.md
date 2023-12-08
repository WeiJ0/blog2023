---
pubDatetime: 2023-12-08T08:40:00
title: Nesting CSS - 可以不用預處理器了嗎
postSlug: nesting-css
featured: false
draft: false
tags:
  - CSS
description: 近期又看到了 Safari 的 Preview 支援了 Nesting CSS 的功能，所以再次比較一下 Nesting CSS 和 SCSS 的差異。但因為瀏覽器的支援截至 2023 年底還不夠完整，所以在短期之內，還是沒辦法完全取代 SCSS 的地位。
---

## 前言

雖然說這已經不是什麼新聞了，但近期看到號稱為現代 IE 的 Safari 也終於在預覽版加入 Nesting CSS 的支援，可能真的離不用預處理器的日子不遠了。

但真的不需要 SCSS 處理器了嗎？

## Nesting CSS VS SCSS

### 相似處

Nesting CSS 是一種 CSS 語法，可以讓開發者在撰寫 CSS 時，可以像是 SCSS 一樣使用巢狀結構，加快開發速度，並且不需要額外的處理器。

以往是這樣寫：

```css
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.container .title {
  font-size: 24px;
  color: #000;
}
```

現在可以這樣寫，基本上和 SCSS 一樣：

```scss
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;

  .title {
    font-size: 24px;
    color: #000;
  }
}
```

也有著 `&` 的使用方法

```scss
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;

  &.active {
    background-color: #000;
  }
}
```

### 差異處

但是 Nesting CSS 和 SCSS 也有著不同的地方，例如在使用 `&` 時，SCSS 可以對字串做串聯，但 Nesting CSS 則不行

```scss
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;

  &-active {
    background-color: #000;
  }
}
```

```css
.container-active {
    background-color: #000;
}
```

而 Nesting CSS 無法對字串做串聯，這點就和 SCSS 有所不同。

## 結論

雖然 Nesting CSS 和 SCSS 有著相似的地方，但相較之下 SCSS 的功能還是強大許多，無論是關於 BEM 規則的開發，或者是有著 mixin extend 等功能，這些都是 Nesting CSS 所不具備的。  

而且截至 2023年底 `支援度上瀏覽器也還不夠完整`，所以在短期之內，還是沒辦法完全取代 SCSS 的地位。

![can i use](/assets/blog/nesting-css/caniuse.png)

