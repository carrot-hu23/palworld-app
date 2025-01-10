import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {router} from "./routes";
import {join} from "path";
// import path from "path";

// 创建 Express 应用
const PORT = 8083
const expressApp = express();

// 服务端渲染页面
expressApp.use(express.static(join(__dirname, '../renderer')));
expressApp.get("/", (_rep, res)=>{
    res.sendFile(join(__dirname, '../renderer/index.html'))
})

// for parsing application/json
expressApp.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
expressApp.use(bodyParser.urlencoded({ extended: true }))
// Enable CORS for all routes
expressApp.use(cors());
expressApp.use('/', router);

// 启动 Express 服务
export const server = expressApp.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});