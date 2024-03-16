---
pubDatetime: 2024-03-17T01:00:00
title: mac 執行 npm install 出現 distutils 錯誤
postSlug: mac-npm-install-distutils
featured: false
draft: false
tags:  
  - npm
  - mac
  - python  
ogImage: ""
description: 最近因為有除錯 ios 的需求所以入手了一台 mac mini 作為開發機，但在將 window 的專案丟到 mac 執行 npm install 直接噴了一大串錯誤，主要錯誤的資訊就是 gyp 和最後的 ModuleNotFoundError No module named 'distutils'，最後發現錯誤是來自於 python 安裝的版本，從3.12版本開始，distutils模組被移除了，所以導致了這個錯誤。
---

## 前言

最近因為有除錯 ios 的需求所以入手了一台 mac mini 作為開發機，但在將 window 的專案丟到 mac 執行 `npm install`時，直接噴了一大串錯誤  
(已經先將用戶名專案名相關資訊移除)：


```bash
npm ERR! command failed
    npm ERR! command sh -c node scripts/build.js
    npm ERR! gyp info it worked if it ends with ok
    npm ERR! gyp verb cli [
    npm ERR! gyp verb cli   '/usr/local/bin/node',
    npm ERR! gyp verb cli   'rebuild',
    npm ERR! gyp verb cli   '--verbose',
    npm ERR! gyp verb cli   '--libsass_ext=',
    npm ERR! gyp verb cli   '--libsass_cflags=',
    npm ERR! gyp verb cli   '--libsass_ldflags=',
    npm ERR! gyp verb cli   '--libsass_library='
    npm ERR! gyp verb cli ]
    npm ERR! gyp info using node-gyp@8.4.1
    npm ERR! gyp info using node@18.18.0 | darwin | arm64
    npm ERR! gyp verb command rebuild []
    npm ERR! gyp verb command clean []
    npm ERR! gyp verb clean removing "build" directory
    npm ERR! gyp verb command configure []
    npm ERR! gyp verb find Python Python is not set from command line or npm configuration
    npm ERR! gyp verb find Python Python is not set from environment variable PYTHON
    npm ERR! gyp verb find Python checking if "python3" can be used
    npm ERR! gyp verb find Python - executing "python3" to get executable path
    npm ERR! gyp verb find Python - executable path is "/Library/Frameworks/Python.framework/Versions/3.12/bin/python3"
    npm ERR! gyp verb find Python - executing "/Library/Frameworks/Python.framework/Versions/3.12/bin/python3" to get version
    npm ERR! gyp verb find Python - version is "3.12.0"
    npm ERR! gyp info find Python using Python version 3.12.0 found at "/Library/Frameworks/Python.framework/Versions/3.12/bin/python3"
    npm ERR! gyp verb get node dir no --target version specified, falling back to host node version: 18.18.0
    npm ERR! gyp verb command install [ '18.18.0' ]
    npm ERR! gyp verb install input version string "18.18.0"
    npm ERR! gyp verb install installing version: 18.18.0
    npm ERR! gyp verb install version is already installed, need to check "installVersion"
    npm ERR! gyp verb got "installVersion" 9
    npm ERR! gyp verb needs "installVersion" 9
    npm ERR! gyp verb install version is good
    npm ERR! gyp verb get node dir target node version installed: 18.18.0

    npm ERR! gyp verb build dir "build" dir needed to be created? Yes
    npm ERR! gyp verb build/config.gypi creating config file
    npm ERR! gyp verb gyp gyp format was not specified; forcing "make"
    npm ERR! gyp info spawn /Library/Frameworks/Python.framework/Versions/3.12/bin/python3
    npm ERR! gyp info spawn args [
    npm ERR! gyp info spawn args   'binding.gyp',
    npm ERR! gyp info spawn args   '-f',
    npm ERR! gyp info spawn args   'make',
    npm ERR! gyp info spawn args   '-I',
    npm ERR! gyp info spawn args   '-I',
    npm ERR! gyp info spawn args   '-I',
    npm ERR! gyp info spawn args   '-Dlibrary=shared_library',
    npm ERR! gyp info spawn args   '-Dvisibility=default',
    npm ERR! gyp info spawn args   '-Dnode_engine=v8',
    npm ERR! gyp info spawn args   '--depth=.',
    npm ERR! gyp info spawn args   '--no-parallel',
    npm ERR! gyp info spawn args   '--generator-output',
    npm ERR! gyp info spawn args   'build',
    npm ERR! gyp info spawn args   '-Goutput_dir=.'
    npm ERR! gyp info spawn args ]
    npm ERR! Traceback (most recent call last):
    npm ERR!     import gyp  # noqa: E402
    npm ERR!     ^^^^^^^^^^
    npm ERR!     import gyp.input
    npm ERR!     from distutils.version import StrictVersion
    npm ERR! ModuleNotFoundError: No module named 'distutils'
```

主要錯誤來自於最後的 `ModuleNotFoundError: No module named 'distutils'`

深入研究後得知是 python 版本的關係導致，從 `3.12` 版本開始，原本欲社會安裝的 `distutils` 模組被移除了，所以導致了這個錯誤。

## 解決方法

解決方法有兩種，一種是安裝 python 3.11 以下的版本，另一種是安裝 `distutils` 模組。
我這邊直接選擇安裝 `distutils` 模組，因為這樣不用再去安裝其他版本的 python。

```bash
pip3 install setuptools
```

安裝完成後再重新執行 `npm install` 就可以正常安裝了，結束一場驚魂。