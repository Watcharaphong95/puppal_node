import express from "express";
import {router as user} from "./api/user";
import {router as clinic} from "./api/clinic";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/user", user)
app.use("/clinic", clinic)