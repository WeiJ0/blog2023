---
pubDatetime: 2023-04-22T22:00:00
title: Nuxt3 連接 Supabase 執行 Server Service 的操作
postSlug: nuxt3-with-supabase
featured: false
draft: false
tags:
  - nuxt
  - vue
  - supabase
ogImage: ""
description: 近期開始研究 Nuxt3，再將專案建立後發現除了歡迎畫面變酷之外，官方也很貼心的提供了一份 [Module 清單](https://nuxt.com/modules)，而透過 Nuxt 這次的 Module 功能都能夠更快速的將這些功能整合進專案中，只要敲敲幾個字進去 `nuxt.config.js` 就好了，真的讚。
---

## 前言

近期開始研究 Nuxt3，再將專案建立後發現除了歡迎畫面變酷之外，官方也很貼心的提供了一份 [Module 清單](https://nuxt.com/modules)，而透過 Nuxt 這次的 Module 功能都能夠更快速的將這些功能整合進專案中，只要敲敲幾個字進去 `nuxt.config.js` 就好了，真的讚。

## Supabase

[Supabase](https://supabase.io/) 是一個開源的 Firebase 替代方案，它提供了一個完整的後端解決方案，包含了資料庫、身份驗證、儲存空間、即時資料庫、即時訊息、API 產生器等等，而且它的使用方式跟 Firebase 一樣，都是透過 RESTful API 來操作資料庫。也是我近期喜歡用的服務之一，對於有 SQL 基礎的開發者來說，Supabase 本身提供的 SDK 會非常容易使用。

## 安裝

跟著[官方提供的文件](https://supabase.nuxtjs.org/get-started)來執行

```
npm install @nuxtjs/supabase --save-dev
```

完成後，將 `@nuxtjs/supabase` 加入 `nuxt.config.js` 中的 `buildModules`，並且在 `supabase` 中加入 `url` 跟 `key`

```js
import { defineNuxtConfig } from "nuxt";
export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
});
```

接著將 `supabaseUrl` 跟 `supabaseKey` 加入 `.env` 中，就完成了，就是這麼簡單

```js
SUPABASE_URL = "https://example.supabase.co";
SUPABASE_KEY = "<your_key>";
```

資料庫的網址和 API Key 分別在進入 Supabase 專案的首頁就可以看到了

![](/assets/blog/nuxt3/supabase-config.webp)

## 使用

在使用上基本和 JavaScript 的 SDK 大同小異，官方的說明文件中也提供了 [`vue composables`](https://supabase.nuxtjs.org/usage/composables/use-supabase-auth-client) 和 [`server service`](https://supabase.nuxtjs.org/usage/services/server-supabase-client) 兩種，這次主要都用在 `server service` 上，因為我們的專案是要透過伺服器端操作資料庫。

首先在 Nuxt 的跟目錄下建立一個 `server` 的資料夾，裡面再建立一個 `api` 的資料夾，這邊是 Nuxt 預設的 API 路徑，Nuxt 會自動掃描這個資料夾下的檔案，同時向 HMR 重新註冊，可以參考[官方說明](https://nuxt.com/docs/guide/directory-structure/server)。

檔名的規則則是
**[路由].[Method].[js/ts]**

例如 `api/users.get.js`，這樣就會對應到 `/api/users` 這個路由，而且只有 `GET` 方法可以使用。

在 API 檔案中都應該 export 一個預設處理涵式，這個涵式會接收一個 `event`，這個 `event` 就是 `req` 跟 `res` 的合體，可以透過它來取得 `req` 跟 `res` 還有 `query`、`params`、`body` 等等

```js
//server/api/libraries.ts
export default eventHandler(async event => {
  const client = serverSupabaseClient(event);
  const { data } = await client.from("libraries").select();
  return { libraries: data };
});
```

操作 serverSupabaseClient() 建立的 client 來操作資料庫，這邊我們只是取得 `libraries` 這個資料表的資料，並回傳給前端。

存檔後因為 HMR，所以就可以直接運行，並且在瀏覽器上輸入 `http://localhost:3000/api/libraries`，就可以看到回傳的資料了。

如果要在前端讀取可以使用 `$fetch` 來取得從資料庫回傳的資料

```js
methods:{
    async fetchLibrary() {
        const { libraries } = await this.$fetch('/api/libraries')
    }
},
mounted(){
    this.fetchLibrary();
}

```

若是使用 `post` 的方法

```js
await this.$fetch('/api/libraries', { method: 'POST', body: { name: 'test' } }')
```

## 結論

比起以往的 Nuxt，這次的 Nuxt3 真的是變得更加強大了，而且官方也提供了很多的 Module，其他常用的像是 `tailwindcss`、`pinia`、`google-font` 等等，都可以透過 `npx nuxi add` 來安裝，也是透過 `nuxt.config.js` 來設定。

讓開發者可以更快速的將功能整合進專案中，免除掉很多繁瑣的設定，可以更專注在開發上。
