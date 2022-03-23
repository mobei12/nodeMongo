# nodeMongo

项目启动前的准备：

-   需要配置 ts 环境
-   其次 npm i 装依赖就行
-   发布打包要先用 tsc 命令编译，把 build 文件夹的发布出去就行

```
给 react 项目的后台服务,
.
├── README.md //说明文档
├── package-lock.json
├── package.json//项目依赖
├── src//主目录
│   ├── @types//自定义的ts数据类型
│   ├── app.ts//启动主入口
│   ├── dbase.ts//数据库连接文件
│   ├── exerciseList//运动接口目录
│   ├── tools//工具类目录，包括加密啥的模块
│   └── user//用户类模块
├── tsconfig.json//ts配置
└── tslint.json//ts规范文件

```
