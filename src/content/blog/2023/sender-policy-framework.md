---
pubDatetime: 2023-12-05T22:14:00
title: 發件人策略框架 - Sender Policy Framework SPF
postSlug: sender-policy-framework
featured: false
draft: false
tags:
  - server
ogImage: ""
description: 最近在工作上遇到網站上沒辦法寄出信件，後來輾轉反覆查詢原因，發現是 SPF 設定錯誤的關係，後來就開始查詢 SPF 到底是什麼，於是用這篇記錄下來
---

## 前言

最近在工作上遇到網站上沒辦法寄出信件，後來輾轉反覆查詢原因，發現是 SPF 設定錯誤的關係  

後來就開始查詢 SPF 到底是什麼，於是用這篇記錄下來

## 說明

為什麼需要 SPF，因為寄出的電子郵件地址是可以偽造的，用來欺騙郵件伺服器來規避垃圾郵件或者是進行詐騙，進而影響寄件者的信譽以及隱私  

未來防止上述的情境，所以有了 Sender Policy Framework，可以決定由那些郵件伺服器可以寄出郵件，如此一來收件方的郵件伺服器就可以判斷 SPF 是否符合規則來決定如何收信，有效地減少垃圾郵件和釣魚攻擊

## DNS TXT 設定

在 DNS 設定中，新增一筆 TXT 記錄，名稱為 `@` 內容 `v=spf1 a mx ip4:xxx.xxx.xxx.xxx ~all`  
- `ip4:xxx.xxx.xxx.xxx` 是寄件伺服器的 IP 位址，可以使用 IPv4 或 IPv6
- `a`  則代表符合主機名或網域名稱
- `mx` 則代表符合主機名或網域名稱的 MX 記錄，大部分企業郵件設定收發要同一台伺服器時會使用
- `include:xxx.xxx.xxx.xxx` 則是引用其他 SPF 設定，例如 Google 的 SPF 設定為 `v=spf1 include:_spf.google.com ~all`
- `~all` 是設定規則，`~all` 代表如果不符合規則，就會標記為垃圾郵件，但不會直接拒絕  
如果要直接拒絕，則使用 `-all`，如果要全部通過，則使用 `+all`

