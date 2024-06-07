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

#### Front/back-end development

```bash
npm start
# copy electron-node/verifier/resources to electron-dist/electron-node/verifier/resources
# 先前的命令行不要关闭
npm run start-electron
```

#### Front-end preview, back-end development

```bash
npm run build # 前端打包
# copy electron-node/verifier/resources to electron-dist/electron-node/verifier/resources
npm run start-electron-prod
```

#### Packaging

```bash
npm run build # Front-end Packaging
# copy electron-node/verifier/resources to electron-dist/electron-node/verifier/resources
npm run build-electron # electron Packaging
```

## Project structure

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
├── electron-preload/           electron communications bridge
│   └── preload.ts              Bridge file that connects the main process to the rendering process
├── electron-python/
│   ├── generatorTree/          Generating Behavioral Tree
│   ├── onlineMonitor/          STL online monitoring
│   ├── simulate/               **CARLA**
│   ├── visualization/          **Map Visualization**
│   └── main.py                 python environment entry file
├── public/                     Front-end static resources
├── resources/                  configuration file
├── src/
│   ├── components/             Front-end core components
│   │   ├── common/             Third-Party Public Components
│   │   ├── content/            Scene Modeling Core Components
│   │   ├── extends/            Extended Components
│   │   ├── header/             navigation bar
│   │   ├── modal/              dialog box
│   │   ├── sider/              side-bar
│   │   ├── Home.tsx/           Scene modeling entry file
│   │   └── Welcome.tsx/        Welcome Interface Portal File
│   ├── generator/              Generator for automatically generating routes and card entries from extends
│   ├── model/                  Type definitions used for scene modeling
│   ├── store/                  State Managers for Scene Modeling
│   ├── utils/                  instrumented function
│   ├── App.tsx/                General Page Entry
│   ├── constants.ts            Constants used
│   ├── extendEntry.tsx         Automatically generated documents
│   ├── extendRouter.tsx        Automatically generated documents
│   ├── index.tsx               Front-end entry (mounting React)
│   └── react-app-env.d.ts      Type files, to provide hints about the types of functions in the main process on the front end
└── package.json
```

