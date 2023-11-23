---
pubDatetime: 2023-03-08T15:17:00
title: 幾個常使用的前端 debug 方法
postSlug: front-end-debug
featured: false
draft: false
tags:
  - debug
ogImage: ""
description: 深入解析前端開發中常用的debug方式，包括 console.log 系列的使用。詳細介紹中斷點 (Breakpoint) 的兩種方式：透過程式插入和瀏覽器工具中的 Sources 頁籤設定中斷點，並示範請求事件 (XHR) 的中斷點設定。讓開發者熟悉如何使用開發者工具來查看變數、程式狀態、執行流程，以及在不同情境下進行有效的除錯。提升前端開發效率，避免常見錯誤和意外狀況。
---

在這邊紀錄幾個常用的前端 debug 方式，像是 console 系列以及在程式中或瀏覽器中使用中斷點的功能

## Table of contents

## console 系列

在知道 `console` 以前，最早是用 `alert` 來 debug，但是 `alert` 會導致程式停止有些不方便，後來發現 `console` 還有很多種方法可以使用。

呈現的結果可於各個瀏覽器的開發者工具 (DevTools) 中的主控台 (Console) 頁籤中查看。

### 1. console.log

這是最基本的 console 方法，可以印出變數、字串、結果等等。

```js
console.log("Hello World");
```

![](/assets/blog/front-end-debug/console-1.webp)

### 2. console.table

可以印出物件或是陣列的資料，方便查看。

```js
const obj = {
  name: "John",
  age: 18,
};
console.table(obj);
```

![](/assets/blog/front-end-debug/console-2.webp)

### 3. console.dir

可以印出物件的屬性，方便開發，在操作 DOM 相關語法時十分實用。

```js
let p = document.querySelector("p");
console.dir(p);
```

![](/assets/blog/front-end-debug/console-3.webp)

### 4. console.time

可以計算程式執行的時間，方便查看效能。

```js
console.time("timer");
for (let i = 0; i < 10; i++) {
  console.log(i);
}
console.timeEnd("timer");
```

![](/assets/blog/front-end-debug/console-4.webp)

### 5. console.trace

可以追蹤程式的執行路徑，方便查看程式的流程，不過目前已經較少用到，因為像是 vscode 中都有內建的工具可以快速地找到程式的執行路徑。

```js
function a() {
  b();
}
function b() {
  c();
}
function c() {
  console.trace();
}
a();
```

![](/assets/blog/front-end-debug/console-5.webp)

### 6. console.group

可以將相關的 log 組合在一起，方便查看以及可以做摺疊，類似於 #region 的功能。

```js
console.group("查看 Hello World 的 log");
console.log("Hello World");
console.log("Hello World");
console.groupEnd("查看 Hello World 的 log");
```

![](/assets/blog/front-end-debug/console-6.webp)

### 7. console + css

可以在 console 中使用 css，方便美化 log 的呈現。  
語法的部分在開頭處加上 `%c`，接著第二個參數接上 css 的內容，有點像是 inline style。

```js
console.log("%c Red Hello World", "color: red; font-size: 20px;");
```

![](/assets/blog/front-end-debug/console-7.webp)

## 中斷點 (Breakpoint)

### 1. 透過程式加入

斷點的功能為當程式執行到這個點時，程式會暫停，並且可以透過開發者工具來查看程式的狀態以及此時此刻相關變數的值，方便 debug。

像是可以在 js 中插入 `debugger;`，此時使用瀏覽器瀏覽時就會停在這個點，並且可以透過開發者工具來查看程式的狀態以及此時此刻相關變數的值。

```js
let num = 1;
function a() {
  num++;
  b();
}

function b() {
  num++;
  c();
}

function c() {
  debugger;
}

a();
```

執行到 `c debugger;` 的時候瀏覽器的偵錯工具就會自動跳出，可以透過右手邊的 `範圍(Scope)` 來查看變數的值、在`呼叫堆疊(Call Stack)` 中
也可以看到目前的執行路徑，會回傳文章上述的 `console.trace()` 的結果。

後續也可以透過上方的工具列選項來接著執行下面的程式，由左至右分別為

- 繼續/暫停程式執行，如果有下一個中斷點的話，會停在下一個中斷點，沒有的話讓程式跑完。
- 逐步執行程式，會一行一行的執行程式，方便查看程式的執行流程。
- 進入函式，會進入到下一個函式中。
- 跳出函式，會跳出目前的函式。
- 逐步執行程式，會一行一行的執行程式，方便查看程式的執行流程。
- 停用中斷點。

![](/assets/blog/front-end-debug/debugger-1.webp)

### 2. 透過瀏覽器加入

而除了上述透過程式插入中斷點外，也可以透過瀏覽器開發者工具中的`來源 (Sources)` 頁籤來設定中斷點，進入到頁面後在某支程式<mark>旁邊的行數點一下</mark>，就會出現中斷點
，並透過重新整理讓程式執行到這個中斷點，接著就和剛剛一樣來取得相關資訊。

像是我想透過中斷點來查蝦皮頁面上的某段程式，在執行到這個點時其他相關的變數，就可以透過這個方式來查看。

![](/assets/blog/front-end-debug/debugger-2.webp)

### 3. 請求事件 (XHR) 的中斷點

而在`來源 (Sources)` 頁籤中除了可以查看變數外，也有 XHR 以及 DOM 變化的中斷點可以使用，方便在各種情況下的 debug。

像是在 `XHR/擷取中斷點` 加入條件若 URL 中有 `json` 字樣則自動中斷，在瀏覽器發送請求時只要符合資格就會進入中斷點頁面，在`範圍(Scope)`的地方就可以
看到像在 `網路(Network)` 頁籤中看到的 request header、response body 等資訊。

![](/assets/blog/front-end-debug/debugger-3.webp)
