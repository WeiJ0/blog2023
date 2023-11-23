---
pubDatetime: 2023-06-08T20:30:00
title: JS 陣列排序的新方法 - toSorted()
postSlug: javascript-array-sort
featured: false
draft: false
tags:
  - javascript
  - array
ogImage: ""
description: 優化 JavaScript 陣列排序！新的 toSorted() 方法讓你不必擔心原始陣列變動，直接獲得排序後的結果。相較於傳統 sort()，這個方法省去額外複製陣列的步驟，讓開發更為便利。例子中展示了如何使用 toSorted()，輕鬆獲得排序後的新陣列，同時保留原始陣列。需注意，目前 Firefox 尚未支援此方法，因此在應用時需謹慎。深入了解可參考 MDN 的相關資料。提升排序效率，體驗更順暢的陣列操作！
---

## 前言

近期看到 javascript 有了新的陣列排序方式，相較原本的 `sort()`，在執行後會改變原本的陣列，所以要保留原本陣列需要做額外處理

```js
const arr = [1, 3, 2, 5, 4];
arr.sort((a, b) => {
  return a - b;
});
console.log(arr); // [1,2,3,4,5]
```

如果要保留原本的 [1,3,2,5,4] 陣列，就要先複製一份再做排序

```js
const arr = [1, 3, 2, 5, 4];
const arrCopy = [...arr];
arrCopy.sort((a, b) => {
  return a - b;
});
console.log(arrCopy); // [1,2,3,4,5]
```

而新提供的 `toSorted()` 可以直接回傳一個排序後的陣列，不會改變原本的陣列

```js
const arr = [1, 3, 2, 5, 4];
const arrCopy = arr.toSorted((a, b) => {
  return a - b;
});
console.log(arr); // [1,3,2,5,4]
console.log(arrCopy); // [1,2,3,4,5]
```

在開發上也較為方便一些，可以少做一次的複製動作，但要注意的是目前 `Firefox` 還不支援這個方法，所以要看情況使用。

## 參考資料

- [MDN - Array.prototype.toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
