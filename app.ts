import express from "express";
import {router as index} from "./api/index";
import {router as user} from "./api/user";
import {router as clinic} from "./api/clinic";
import {router as dog} from "./api/dog";
import {router as reserve} from "./api/reserve";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/index", index)
app.use("/user", user)
app.use("/clinic", clinic)
app.use("/dog", dog)
app.use("/reserve", reserve)