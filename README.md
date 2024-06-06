# SML4ADS.js

A tool for autonomous driving scenario modeling, simulation and analysis

## 所需环境

- Python 3.7
- Node >= 18
- Carla 0.9.13

## 运行

### 环境搭建

```bash
git clone https://github.com/ECNUCPS1106/SML4ADS.js
cd ./SML4ADS.js
npm i
# 安装需要的python包
```

### 运行方式

- 启动 Carla
- 启动 Python

```bash
cd ./electron-python
python main.py
```

- 启动前端服务器/打包前端
- 启动 electron

#### 前/后端开发

```bash
npm start
# copy electron-node/verifier/resources to electron-dist/electron-node/verifier/resources
# 先前的命令行不要关闭
npm run start-electron
```

#### 前端预览、后端开发

```bash
npm run build # 前端打包
# copy electron-node/verifier/resources to electron-dist/electron-node/verifier/resources
npm run start-electron-prod
```

#### 打包

```bash
npm run build # 前端打包
# copy electron-node/verifier/resources to electron-dist/electron-node/verifier/resources
npm run build-electron # electron打包
```

## 项目结构

```txt
/
├── .example/                   使用案例
├── electron-main/              electron入口文件
│   └── main.ts                 electron入口文件
├── electron-node/              electron主进程函数文件夹
│   ├── converter/              ADSML->OpenScenario2 相关
│   ├── evaluate/               场景复杂度评价相关
│   ├── io/                     本地文件读写相关
│   ├── rpc/                    RPC相关（调用Python）
│   ├── stl/                    STL生成相关
│   ├── verifier/               UPPAAL 相关
│   └── video/                  视频预览相关
├── electron-preload/           electron通信桥
│   └── preload.ts              桥接文件，连接主进程与渲染进程
├── electron-python/
│   ├── generatorTree/          数据生成行为树相关（未使用到
│   ├── onlineMonitor/          STL在线监测相关
│   ├── simulate/               **CARLA仿真相关**
│   ├── visualization/          **地图可视化相关**
│   └── main.py                 python环境入口文件
├── public/                     前端静态资源（前端用到的图片可以存这里）
├── resources/                  配置文件，无需变动
├── src/
│   ├── components/             前端核心组件
│   │   ├── common/             第三方公共组件
│   │   ├── content/            场景建模核心组件
│   │   ├── extends/            扩展组件（扩展卡片接口）
│   │   ├── header/             导航栏
│   │   ├── modal/              对话框
│   │   ├── sider/              侧边栏（场景管理）
│   │   ├── Home.tsx/           场景建模入口文件
│   │   └── Welcome.tsx/        欢迎界面入口文件
│   ├── generator/              生成器，用于从extends中自动生成路由和卡片入口
│   ├── model/                  场景建模用到的类型定义
│   ├── store/                  场景建模用到的状态管理器（手写的Redux）
│   ├── utils/                  工具函数
│   ├── App.tsx/                总页面入口（挂载路由）
│   ├── constants.ts            使用到的常量
│   ├── extendEntry.tsx         自动生成的文件，无需变动
│   ├── extendRouter.tsx        自动生成的文件，无需变动
│   ├── index.tsx               前端入口（挂载React）
│   └── react-app-env.d.ts      类型文件，用于提供主进程中的函数在前端的类型提示
└── package.json
```

## 基础开发

### 主进程添加函数

如果你想要实现某一功能，但所需的依赖在 Node.js 环境下，或者需要大量耗时的操作。请将其放置在 electron 的主进程下。

> 渲染进程无法使用 Node.js 中的任何函数，这意味着如果你想要读取文件/网络等，必须通过主进程下的函数调用！

以添加 `readFile` 函数为例：

1. `electron-node` 中添加 `readFile.ts` 函数文件：

```ts
import fs from "fs";

function readFile(_e: any, path: string, encoding: BufferEncoding = "utf-8") {
  return fs.readFileSync(path, encoding);
}

export default readFile; // 对外暴露
```

注意主进程中的函数第一个入参为 electron 使用的，需要预留出来。

2.`electron-main/index.ts` 中注册添加的函数

```ts
import readFile from "../electron-node/io/readFile";

app.whenReady().then(() => {
  // 添加你的函数
  ipcMain.handle("io:readFile", readFile);
});
```

`"io:readFile"` 是 electron 中对于这个函数的自定义唯一标识符，不能和其他重复。

3. `electron-preload/preload.ts` 中注册添加的函数

```ts
contextBridge.exposeInMainWorld("electronAPI", {
  // 添加你的函数
  readFile: (filePath: string, encoding?: BufferEncoding) =>
    ipcRenderer.invoke("io:readFile", filePath, encoding),
});
```

`"io:readFile"` 就是上一步自定义的唯一标识符。

4. `react-app-env.d.ts` 中注册对应的类型，为前端提供类型提示

```ts
export interface IElectronAPI {
  // 添加你的函数
  readFile: (path: string, encoding?: BufferEncoding) => Promise<string>;
}
```

### Python 添加函数供 electron 调用

`electron-python/main.py` 中：

```python
def simulate(args):
  # 定义的新函数，想要让electron调用
  pass

def main():
    server = hprose.HttpServer(port=20225)
    # 添加你的函数
    server.addFunction(simulate)
    server.handle('RPC')
    server.start()
```

### electron 使用 RPC 调用其他环境的函数

> 以下需要掌握 React & ES6 相关知识

例如想要在页面开始渲染时调用 RPC 获得某些数据

```tsx
function Component(): ReactElement {
  // onMounted，初始渲染会调用
  useEffect(() => {
    const asyncFn = async () => {
      // 调用RPC
      try {
        const res = await window.electronAPI.extendRPC(
          "<函数名>",
          "127.0.0.1",
          "20225"
          // 函数要传的其他参数
        );
        // res后续使用...
      } catch (e: any) {
        // 出错，弹出提示框
        notification.error({
          message: "Error",
          description: e.message,
        });
      }
    };
    asyncFn();
  }, []);
  return <></>;
}
```

其他主进程使用方式类似：

```ts
const res = await window.electronAPI.<函数名>(...args);
```

### 在欢迎页面添加一个扩展接口入口

1. 在 `src/components/extends` 中新建一个 `Xxx.tsx` 文件或者新建一个 `Xxx` 的文件夹并在内部新建一个`index.tsx` 文件。

2. `tsx` 文件中的内容如下，两个导出缺一不可：

```tsx
import { ReactElement } from "react";

export const meta = {
  title: "这里是卡片展示的标题",
  description: "这里是卡片展示的描述",
};

export default function Test(): ReactElement {
  return <div>这里写具体页面</div>;
}
```

3. 重新运行 `npm run start` 和 `npm run start-electron`，该命令会调用 `src/generator/index.ts` 自动生成对应的页面入口和页面路由。
