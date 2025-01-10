# palworld-app

An Electron application with React and TypeScript

使用 Electron 自带 Node.js 环境，可以在main进程启动一个 http server,
从而与 render 进程 http 通信交互。并且打包后可以通过http server 渲染页面。这样就同时存在桌面端和网页端。

## Preview

**Desktop**
![desktop](/docs/images/desktop.png "Magic Gardens")

**Web**
![web](/docs/images/web.png "Magic Gardens")

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
