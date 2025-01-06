import express from "express";
import {router as index} from "./api/index";
import {router as user} from "./api/user";
import {router as clinic} from "./api/clinic";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/index", index)
app.use("/user", user)
app.use("/clinic", clinic)