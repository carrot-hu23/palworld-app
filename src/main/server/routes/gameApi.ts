import * as express from "express";
import {getConfig, saveConfig} from "../service/gameConfig";
import {Config, success} from "../types";


export const gameRouter = express.Router();

gameRouter.get("/api/game/update", (_rep, res) => {
    res.json(`update success`)
})

gameRouter.get("/api/game/start", (_rep, res) => {
    res.json(`start success`)
})

gameRouter.get("/api/game/stop", (_rep, res) => {
    res.json(`stop success`)
})

gameRouter.get("/api/game/system/config", (_rep, res) => {
    res.json(success(getConfig(), "success"))
})

gameRouter.post("/api/game/system/config", (rep, res) => {
    const config: Config = rep.body;
    saveConfig(config)
    res.json(success(null, "success"))
})