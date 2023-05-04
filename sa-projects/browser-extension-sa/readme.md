
## 参考 
- []




### chrome 插件介绍
chrome 插件相当于一个静态网页，但远比静态网页功能强大，chrome 插件通常由以下几部分组成：

- manifest.json：相当于插件的 meta 信息，包含插件的名称、版本号、图标、脚本文件名称等，这个文件是每个插件都必须提供的，其他几部分都是可选的。

- background script：可以调用全部的 chrome 插件 API，实现跨域请求、网页截屏、弹出 chrome 通知消息等功能。相当于在一个隐藏的浏览器页面内默默运行。
功能页面：包括点击插件图标弹出的页面（简称 popup）、插件的配置页面（简称 options）。

- content script：是插件注入到页面的脚本。content script 可以操作 DOM，但是它和页面其他的脚本是隔离的，访问不到其他脚本定义的变量、函数等，相当于运行在单独的沙盒里。content script 可以调用有限的 chrome 插件 API，通知到 background script ，实现网络请求。


### Plasmo 框架是一个开源的浏览器扩展 SDK
  支持所有主流的浏览器，构建你的插件，无需担心配置文件编写和构建浏览器扩展时的奇怪特性，plasmo 帮助我们屏蔽了底层的差异。