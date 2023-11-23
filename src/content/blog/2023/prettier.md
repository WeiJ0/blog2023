---
pubDatetime: 2023-04-14T08:58:00
title: Prettier - 程式碼格式化工具
postSlug: prettier
featured: false
draft: false
tags:
  - tool
  - vscode
ogImage: ""
description: 之前開發專案都比較屬於獨立開發，所以比較沒有注重於統一程式碼風格，可能會因為寫 Code 時間不同，所以有些地方是用單引號，有些地方又用雙引號等等問題，但最近有了轉職的想法，為了避免自己的這種惡習以及面試可能會被問到相關的問題，所以就針對這類的工具做研究，而最後挑選到的是 Prettier，除了可以加入到專案中外，也可以透過 VSCode 的 Extension 來使用。
---

## 前言

之前開發專案都比較屬於獨立開發，所以比較沒有注重於統一程式碼風格，可能會因為寫 Code 時間不同，所以有些地方是用單引號，有些地方又用雙引號等等問題，但最近有了轉職的想法，為了避免自己的這種惡習以及面試可能會被問到相關的問題，所以就針對這類的工具做研究，而最後挑選到的是 `Prettier`，除了可以加入到專案中外，也可以透過 `VSCode` 的 `Extension` 來使用。

## Prettier

先來介紹 `Prettier`，它可以幫助我們統一程式碼的風格，並且可以透過設定檔來調整風格，而且它也支援多種程式語言

![Prettier 可支援的程式語言](/assets/blog/prettier/prettier-1.webp)

除此之外也能透過 IDE 的 Extension 來使用，這樣就不用每次都要手動執行，目前支援的 IDE 也是很多，包含大家最常用的 `VSCode` `WebStorm` `Atom` `Sublime Text` 等等

![有 Prettier Extension 的 IDE](/assets/blog/prettier/prettier-2.webp)

## 安裝

```bash
npm install --save-dev --save-exact prettier
```

安裝後在專案的跟目錄下建立一個 `.prettierrc` 及 `.prettierignore`，前者用來存放設定檔，後者用來忽略不需要格式化的檔案

### .prettierrc

這邊提供一些較為常用的設定，並且用 `json` 的方式來做配置，如果有 `js` `yaml` `toml` 的需求可以參考 [Prettier Configuration](https://prettier.io/docs/en/configuration.html)，而更詳細的配置選項可以參考 [Prettier Options](https://prettier.io/docs/en/options.html)

```json
{
  "printWidth": 80, // 一行最多多少字元
  "tabWidth": 2, // tab 多少個空格
  "useTabs": false, // 是否使用 tab
  "semi": true, // 是否使用分號
  "singleQuote": true, // 是否使用單引號
  "trailingComma": "es5", // 最後一個物件是否加上逗號
  "bracketSpacing": true, // 物件的大括號是否加上空格
  "jsxBracketSameLine": false, // jsx 的大括號是否換行
  "arrowParens": "always" // 箭頭函式是否加上括號
}
```

上方這幾樣其實如果沒有透過工具來做格式化，很容易會因開發時間不同而不統一。

### .prettierignore

官方文件上提供的範例如下

```bash
# 不進行處理的資料夾
build
coverage

# 不進行處理的檔案： 所有的 html 檔
*.html
```

### 在程式碼中使用 ignore

而除了透過 `.prettierignore` 來忽略檔案外，也可以透過在程式碼中加入`忽略特定的程式碼`的標記，來達成。像是有些函式可能會有很長的參數，或是透過原本的方式做排版閱讀性較高，這時候就可以透過 `// prettier-ignore` 來忽略這段程式碼的格式化。

```js
matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

像是上方的矩陣例子，如果沒有加上 `// prettier-ignore`，它會自動幫我們排版，這樣閱讀性反而就不太好了。

```js
matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

其他還有一些 `HTML` `CSS` 的方式，可以參考 [Prettier Ignore](https://prettier.io/docs/en/ignore.html)

## 執行

執行的方式有兩種，一種是透過 `CLI`，另一種是透過 `IDE` 的 `Extension`。

### CLI

- #### write (格式化)

```bash
# 格式化所有的檔案 .
prettier --write .

# 格式化特定檔案 src/js/index.js
prettier --write src/js/index.js

# 格式化特定副檔名的檔案
prettier --write "**/*.js"
```

而除了透過配置檔外，特殊的情況也可以透過 `CLI` 的方式來做設定，像是 `package.json` 中可能要使用雙引號，但是其他的檔案則是使用單引號，這時候就可以透過 `CLI` 的方式來做設定

```bash
# 格式化 package.json，將單引號關閉
prettier --write package.json --single-quote false
```

- #### check (檢查是否格式化)

除了進行格式外也可以透過 `check` 來檢查檔案是否有格式化過，如果沒有格式化過就會顯示錯誤

```bash
# 檢查所有的檔案
prettier --check .

# 若有檔案沒有格式化過，就會顯示提示
Checking formatting...
[warn] src/fileA.js
[warn] src/fileB.js
[warn] Code style issues found in 2 files. Forgot to run Prettier?
```

其他的 CLI 指令可以參考 [Prettier CLI](https://prettier.io/docs/en/cli.html)

### VSCode Extension

VSCode 有提供 [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)，安裝後就可以透過 `F1` 執行 `Format Document > prettier` 來進行格式化。

若要在儲存時自動格式化，可以在 `settings.json` 中加入以下設定

```json
{
  "editor.formatOnSave": true, // 存檔時自動格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

當然也可以針對不同的程式碼有不同的設定，例如預設不開啟自動格式化，但是在 `javascript` 檔案中開啟自動格式化

```json
{
  "editor.formatOnSave": false,
  "[javascript]": {
    "editor.formatOnSave": true
  }
}
```

目前支援的程式語言如下

- javascript
- javascriptreact
- typescript
- typescriptreact
- json
- graphql
- handlebars

而配置的部分也是在 `setting.json` 中做設定，像是上述有提到的單引號

```json
{
  "prettier.singleQuote": true
}
```

## 結論

透過 `Prettier` 可以有效讓我們產出的程式碼格式更加的一致，像是透過 VSCode 的 `Extension`，可以在儲存時自動格式化，也是十分方便，一行指令碼都不用去打。

不過目前像 VSCode 的 `setting.json` 如果有做登入的話都會雲端同步，如果有不同專案不同的設定，可能會有一些問題，這部分可以透過 `workspace` 的方式來解決：

在專案中新增 `.vscode` 資料夾，並在裡面新增 `setting.json`，這樣就可以針對不同的專案做不同的設定。

## 參考資料

- [Prettier](https://prettier.io/)
- [隨時隨地格式化 - Prettier](https://ithelp.ithome.com.tw/articles/10294321)
