import servestatic from "serve-static";
import path from "path";
import express from "express";

const app = express();

app.use(servestatic(path.join(path.resolve(), "dist")));

app.listen(8080);

module.exports = app;
