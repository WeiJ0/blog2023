---
pubDatetime: 2024-02-24T23:15:00
title: JS 新增的擴充方法 - with() toSpliced() toReversed()
postSlug: javascript-array-with-toSpliced-toReversed
featured: false
draft: false
tags:
  - javascript
  - array
ogImage: ""
description: 在使用框架 vue react 的時候，常常會需要利用陣列的資料來做一些操作，但又不想更改原本的資料，以前就需要先複製一份再做操作，所以 JS 新增了幾個原有方法的擴充，讓開發更佳的便利。
---

## 前言

最近又在網路上看到了一些 js array 的新方法，想說完了，學不完了。還好這些方法都是按照原本就有方法擴充的方式，所以不會有太大的學習負擔，而且這些方法都是很實用的，可以讓開發更為便利。

在使用框架 vue react 的時候，常常會需要利用陣列的資料來做一些操作，但又不想更改原本的資料，以前就需要先複製一份再做操作，而剛入門的時候，又不太懂得所謂的`By Value` `By Reference` 所以老是搞不清楚為什麼原本的資料會被更動。

### with()

例如要將陣列內的 2 改成 10 時，常常直覺且出錯的方法是
```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr; // 這邊因為是 By Reference，所以 arr2 會指向 arr 的記憶體位置
arr2[1] = 10; // 這邊改動 arr2 也會改動 arr
console.log(arr2); // [1, 10, 3, 4, 5]
console.log(arr); // [1, 10, 3, 4, 5] 一同被更動了
```

而原本的複製方法是
```js
const arr = [1, 2, 3, 4, 5];
const arrCopy = [...arr]; // 這邊因為是 By Value，所以 arrCopy 會複製 arr 的值
arrCopy[1] = 10; // 這邊改動 arrCopy 不會改動 arr
console.log(arrCopy); // [1, 10, 3, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5] // 保留原本的資料
```

現在可以直接使用 `with()` 方法，省去了複製的動作也讓程式碼稍微直覺了一些
```js
const arr = [1, 2, 3, 4, 5];
const arrCopy = arr.with(1, 10);
console.log(arrCopy); // [1, 10, 3, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]
```

with 亦能夠鏈結使用
```js
const arr = [1, 2, 3, 4, 5];
const arrCopy = arr.with(1, 10).with(2, 20);
console.log(arrCopy); // [1, 10, 20, 4, 5]
```

### toSpliced()

而 `toSpliced()` 方法則是可以直接回傳一個刪除後的陣列，不會改變原本的陣列，為原本的 `splice()` 方法的擴充

```js
const arr = [1, 2, 3, 4, 5];
const arrCopy = arr.toSpliced(1, 1);
console.log(arrCopy); // [1, 3, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]
```

### toReversed()
`toReversed()` 方法則是可以直接回傳一個反轉後的陣列，不會改變原本的陣列，為原本的 `reverse()` 方法的擴充

```js
const arr = [1, 2, 3, 4, 5];
const arrCopy = arr.toReversed();
console.log(arrCopy); // [5, 4, 3, 2, 1]
console.log(arr); // [1, 2, 3, 4, 5]
```

上述的這三個方法相容性也都非常高，甚至在 node 都能無痛使用。在需要處理資料時，可以更方便的使用這些方法，不用再擔心原本的資料會被更動。

## 參考資料

- [MDN - Array.prototype.with()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with)
- [MDN - Array.prototype.toSpliced()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)
- [MDN - Array.prototype.toReversed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)
