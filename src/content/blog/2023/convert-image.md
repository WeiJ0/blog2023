---
pubDatetime: 2023-04-10T10:17:00
title: magick - 非常實用的圖片轉檔工具
postSlug: convert-image
featured: false
draft: false
tags:
  - tool
  - 圖片處理
ogImage: ""
description: 這篇文章介紹了一個非常實用的圖片轉換和處理工具 magick，它可以幫助我們快速地將圖片轉換成不同的格式、壓縮圖片、調整大小、加上浮水印等。相較於線上轉換工具，使用 magick 可以更有效率地進行轉換，並提升工作效率。
---

## Table of contents

## 前言

昨天上了保哥的網站前端優化課程，其中有一個工具介紹，就是 `magick`，這是一個非常實用的轉檔工具，可以幫助我們快速的將圖片轉換成不同的格式，或是壓縮圖片，甚至是將圖片加上浮水印，非常實用。

以往有這類需求都是透過線上的轉檔工具，例如 [squoosh](https://squoosh.app/)，但就是要花點時間去做上傳下載的動作，但透過 `magick` 這個工具，就可以快速透過 cmd 的方式進行轉檔，效率提升非常多。

![squoosh](/assets/blog/convert-image/squoosh.webp)

## 安裝

這邊以 windows 系統為例，可以直接到 magick 的官網下載安裝檔，[下載連結](https://imagemagick.org/script/download.php#windows)。 (裡頭也詳細的說明了其他作業系統如何安裝，如 Linux、Mac OS、IOS)

安裝後，可以在 cmd 輸入 `magick --verson`，如果有出現版本相關資訊就代表安裝成功。

```bash
> magick --version
Version: ImageMagick 7.1.1-6 Q16-HDRI x64 b2dd67b:20230402 https://imagemagick.org
Copyright: (C) 1999 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC HDRI Modules OpenCL OpenMP(2.0)
Delegates (built-in): bzlib cairo flif freetype gslib heic jng jp2 jpeg jxl lcms lqr lzma openexr pangocairo png ps raqm raw rsvg tiff webp xml zip zlib
Compiler: Visual Studio 2022 (193431943)
```

## 常用指令

magick 提供的功能也相當的多，除了格式轉換外，也可以同步做壓縮、縮圖，甚至可以套上濾鏡，功能五花八門，是一個非常強大的處理工具，但這邊就簡單說明一些常用的指令。

### 1. 轉換圖片格式

單張圖檔的轉換

```bash
magick convert input.jpg output.webp
```

資料夾下所有圖檔的轉換

```bash
magick magick mogrify -format webp *.jpg
```

### 2. 壓縮圖片

```bash
magick convert input.jpg -quality 80 output.jpg
```

### 3. 調整圖片大小

等比大小縮放

```bash
magick convert input.jpg -resize 50% output.jpg
```

固定寬高

```bash
magick input.jpg -resize 300x200 output.jpg
```

### 4. 圖片加上浮水印

```bash
magick input.jpg watermark.png -gravity southeast -composite output.jpg
```

### 5. 圖片新增模糊效果

```bash
magick input.jpg -blur 0x5 output.jpg
```

以上這些強大的功能都只需要透過提示命令字元一行指令就可以完成，非常實用，可以幫助我們快速的處理圖片，提升效率。

## 搭配 PowerShell 效率的使用

上述的 cmd 指令也可以在 `PowerShell` 中使用，更可以透過 `PowerShell` 本身的功能，將指令包裝成 function。雖然 function 在關閉視窗後就會失效，但能夠透過設定自動載入的方式讓我們在每次開啟視窗時就可以直接使用。

將打開 PowerShell 打上 `$profile`，就會列出目前 powershell 的設定檔路徑，接著對這個設定檔使用記事本或 vscode 打開都可以。

**如果沒有這個檔案可以透過下列指令建立**

```powershell
New-Item -Type File -Force $profile
```

設定檔的部分填上

```powershell
function jpg2webp {
    magick mogrify -format webp *.jpg
}

function png2webp {
    magick mogrify -format webp *.png
}
```

這樣之後打開 powershell 視窗都會自動註冊這兩個 function 可以直接使用。

而在[保哥的文章](https://blog.miniasp.com/post/2023/01/20/ImageMagick-convert-PNG-JPEG-GIF-image-to-AVIF-and-WebP-format)中更有提到可以使用 docker 來執行 magick，這樣就不用安裝 magick 了

## 參考資料

- [如何使用 ImageMagick 批次將 PNG 圖片轉檔成 AVIF 與 WebP 格式 - The Will Will Web](https://blog.miniasp.com/post/2023/01/20/ImageMagick-convert-PNG-JPEG-GIF-image-to-AVIF-and-WebP-format)

- [ImageMagick](https://imagemagick.org/index.php)
