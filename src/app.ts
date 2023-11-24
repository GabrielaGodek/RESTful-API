import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import coffeesRoutes from './routes/coffeesRoutes'
import ErrorHandler, { HttpStatusCode } from './utils/errorHandler'
import errorController from './controllers/errorControllers'

const allowedOrigins = ['http://localhost:3000/products', 'http://lazycup.vercel.app/products']

const app = express();
app.use(json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.use('/api/v1/coffees', coffeesRoutes)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorHandler('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'not existing address'))
})

app.use(errorController)

export { app }