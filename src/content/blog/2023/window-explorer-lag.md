---
pubDatetime: 2023-04-20T09:23:00
title: window 10 點右鍵選單會出現沒有回應，檔案總管 Lag 的解決方法
postSlug: window-explorer-lag
featured: false
draft: false
tags:
  - debug
  - window
  - explorer
ogImage: ""
description: 其實這個問題已經存在一陣子，但因為是公司電腦也就不理他，直到今天要按右鍵對某個資料夾做壓縮時，只要按右鍵就是轉圈圈沒有回應，檔案總管自動重啟無限循環，重開機也沒有好轉，才開始上網找尋排除方法。
---

## 前言

其實這個問題已經存在一陣子，但因為是公司電腦也就不理他，直到今天要按右鍵對某個資料夾做壓縮時，只要按右鍵就是轉圈圈沒有回應，檔案總管自動重啟無限循環，重開機也沒有好轉，才開始上網找尋排除方法。

## 原因

公司的電腦配置是 i7-2600 + 24 GB 的 RAM，再怎麼說也不應該會出現這種情況，後來上網找到一篇文章，提到這個問題是因為 Windows 10 的檔案總管會自動去儲存一些資料夾的縮圖或是近期使用的歷史紀錄的 cache，長時間用下來資料會非常的龐大，如果沒有做清除的話就會一直累積，最後就會和我一樣出現這種情形。

## 解決方法

打開 `regedit` 找到目錄 `HKEY_CURRENT_USER\SOFTWARE\Classes\Local Settings\Software\Microsoft\Windows\Shell`，並右鍵刪除 `BagMRU` 和 `Bags` 兩個資料夾

刪除後應該就會直接有感了。

## 圖文參考

後來也找到這篇文章，也是再做一樣的事情，作者更附上圖 Step by Step 的圖文說明，如果對於文字說明不是很了解可以參考。

[impochun - [DIY] 快速修復 Windows 總管檔案當機問題](https://blog.impochun.com/windows-explorer-no-response/)
