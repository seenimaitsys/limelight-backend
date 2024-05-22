"use strict";
import express from "express";
import DotEnv from "dotenv";
import cors from "cors";
import config from "./config.js";
import cookieParser from "cookie-parser";
import CreateReviewerRoutesConfig from "./AddNewReviewer/routes.config.js";
import authRoutesConfig from "./authorization/routes.config.js";
import GetUniqeVideoRoutesConfig from "./GetUniqueVideos/routes.config.js";
const app = express();
DotEnv.config();
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);
// app.use(bodyParser.json());

// app.use("/api", studentRoutes.routes);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
authRoutesConfig(app);
CreateReviewerRoutesConfig(app);
GetUniqeVideoRoutesConfig(app);
