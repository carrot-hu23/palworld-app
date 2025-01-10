import * as express from "express";

export const helloRouter = express.Router();

helloRouter.get("/hello", (rep,res)=>{
    const name = rep.query.name as string || 'World'
    res.json(`Hello ${name}`)
})