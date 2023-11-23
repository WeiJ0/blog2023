---
pubDatetime: 2023-11-23T18:17:00
title: object-fit 在 safari 失效問題
postSlug: safari-object-fit
featured: false
draft: false
tags:
  - css
  - safari
ogImage: ""
description: 最近在專案上圖片使用了 object-fit cover 來設定圖片，讓圖片能夠固定尺寸不會導致跑版，從電腦上去 debug 也沒有問題結果被反應了從 safari 上看卻意外的變形，但了一些支援度 can i use 是支援 object-fit 的，後來發現是因為無法取得高度，所以改使用min-height 解決。
---

## 前言

最近在專案上圖片使用了 `object-fit: cover` 來設定圖片，讓圖片能夠固定尺寸不會導致跑版，從電腦上去 debug 也沒有問題  

結果被反應了從 safari 上看卻意外的變形，但了一些支援度 can i use 是支援 `object-fit` 的

![can i use](/assets/blog/safari-object-fit/objectFit.webp)

也沒有相關 `-webkit-object-fit` 的前綴屬性，所以只能另尋解決方法  

```css
.imgBox{
    height: 300px;
    width: 300px;
}

.imgBox img{
    height: 100%;
    max-width: 100%;
    object-fit: cover;
}
```

## 解決方法

後來發現是 `height: 100%` 惹得禍，沒有正確的取到高度，所以改使用 `min-height` 來撐開取得高度即可。

```css
.imgBox img{
    min-height: 100%;
    max-width: 100%;
    object-fit: cover;
}
```