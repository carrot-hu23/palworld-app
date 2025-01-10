import * as express from 'express';
import {helloRouter} from "./helloApi";
import {gameRouter} from "./gameApi";

export const router = express.Router();

router.use("/", helloRouter)
router.use("/", gameRouter)