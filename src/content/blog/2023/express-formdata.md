---
pubDatetime: 2023-03-09T09:50:00
title: 在 Express 上接收 FormData 資料
postSlug: express-formdata
featured: false
draft: false
tags:
  - node
  - express
ogImage: ""
description: 探索透過axios實現圖片上傳至express，再透過imgur API傳至imgur的流程。前端以FormData方式傳送圖片檔案，利用axios搭建API，展示單張圖片上傳的實例。後端利用multer套件處理express中的formData，支援多檔案上傳。文章提供完整前後端代碼和使用multer不同模式的示例，解決在處理express上的一些麻煩，為未來類似功能的開發提供了實用的參考和紀錄。深入了解圖片上傳流程，讓你輕鬆應對複雜的開發挑戰。
---

## 前言

這次的專案中有上傳圖片的功能，流程大概是透過 axios 將圖片上傳到 express 上，再透過 imgur 的 API 上傳到 imgur 上，最後回傳 imgur 的圖片網址。

不過在處理 express 上就遇到了一些麻煩，避免之後做類似功能還要重新查資料，這次就做一下紀錄。

## 前端

前端的部分要傳送圖片會有兩種方式:

- 將圖片先轉為 base64，再傳送
- 透過 FormData 傳送圖片檔案

這次的專案中，使用第二種方式 FormData 來傳送。

```js title="api.js"
// api.js
const uploadRequest = axios.create({
  baseURL: "API 路徑...",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const userUpload = formData => {
  uploadRequest("", formData);
};
```

```jsx
import { userUpload } from "api.js";

const demo = () => {
  const uploadImage = file => {
    const formData = new FormData();
    formData.append("image", file);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          uploadImage(e);
        }}
      />
    </>
  );
};
```

上面提供的是單張圖片的上傳，如果是多張圖片的話可以用迴圈的方式加入 `image`

```js
for (let i = 0; i < e.target.files.length; i++) {
  formData.append("image", e.target.files[i]);
}
```

## 後端

```bash
npm install --save multer
```

Express 需要安裝 `multer` 這個套件，因為 body-parse 本身不支援 formData

```js
// plugin
import express from "express";
import multer from "multer";

const app = express();
const upload = multer();

app.post("/userUpload", upload.array("image"), async (req, res) => {
  const file = req.files[0];
});
```

這邊的 `upload.array('image')` 是指定接收的參數名稱，對應到前端 formData，如果是多張圖片的話，可以使用 `upload.array('image', 5)`，第二個參數是指定接收的最大數量。

另外還有其他的參數可以使用

- single(field) : 純粹一個檔案，結果會放在 `req.file`
- any() : 寬鬆模式接收多檔案，也可以設定最多接收幾個檔案，結果放在 `req.files`
- none() : 只會接收純文字檔案
- fields() : 嚴格模式接收多檔案，需帶有名稱及數量，物件帶有 `{name:maxCount}`
