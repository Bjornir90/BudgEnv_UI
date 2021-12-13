import servestatic from 'serve-static'
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config();

const app = express();

if(process.env.NODE_ENV === 'production'){
    app.use(servestatic(path.join(path.resolve(), 'dist')));
}

module.exports = app;