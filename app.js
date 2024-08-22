import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// static files from frontend
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'frontend')))

// routes import
import urlRouter from './routes/url.routes.js'

// routes
app.use('/api', urlRouter)

export {app}