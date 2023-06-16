import express, { Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose from "mongoose";
import {mongoURL, port} from './config/config'
import passport from "passport";

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.get('/', (req:Request, res:Response) => {
    res.send("<h1>FUnciona</h>")
});

mongoose.connect(mongoURL);
console.log("Database connected!");

const expressServer = app.listen(port, () => {
    console.log(`Server listening port ${port}`);
})

expressServer.on('error', (err:Error) => {
    console.log(err);
})

