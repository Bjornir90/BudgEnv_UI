import servestatic from 'serve-static'
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config();

const app = express();

app.use(servestatic(path.join(path.resolve(), 'dist')));

app.listen(8080);

module.exports = app;