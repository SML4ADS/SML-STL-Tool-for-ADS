# SML4ADS.js

A tool for autonomous driving scenario modeling, simulation and analysis

## Required environment

- Python 3.7
- Node >= 18
- Carla 0.9.13

## Run

### environment building

```bash
git clone https://github.com/ECNUCPS1106/SML4ADS.js
cd ./SML4ADS.js
npm i
# Install the required python packages
```

### start

- start Carla
- start Python

```bash
cd ./electron-python
python main.py
```

- Starting the front-end server/packaging the front-end
- Starting electron

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
├── .example/                   usecase
├── electron-main/              electron entry
│   └── main.ts                 electron entry
├── electron-node/              electron Master Process Functions
│   ├── converter/              ADSML->OpenScenario2
│   ├── evaluate/               Scenario complexity evaluation correlation
│   ├── io/                     Local file read/write
│   ├── rpc/                    RPC related (calling Python)
│   ├── stl/                    STL generation
│   ├── verifier/               UPPAAL
│   └── video/                  Video Preview
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

