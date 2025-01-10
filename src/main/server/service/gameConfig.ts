import fs from 'fs-extra';
// const path = window.require('path');

import {Config} from "../types";
import {join} from "path";
import {app} from 'electron';

// const configPath = join(app.getAppPath(), 'config.json');

// 获取应用的根路径，即 `resources` 同级目录
const configPath = join(app.getAppPath(), 'config.json');

function getConfig(): Config {
    try {
        return fs.readJSONSync(configPath)
    } catch (err) {
        console.log(err)
        return {force_install_dir: "", steamcmd: ""}
    }
}

function saveConfig(config: Config) {
    fs.writeJSONSync(configPath, config)
}

export {
    getConfig,
    saveConfig
}