import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import coffeesRoutes from './routes/coffeesRoutes'
import ErrorHandler, { HttpStatusCode } from './utils/errorHandler'
import errorController from './controllers/errorControllers'

const allowedOrigins = ['http://localhost:5173/', 'http://lazycup.vercel.app/']

const app = express();
app.use(json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use('/api/v1/coffees', coffeesRoutes)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorHandler('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'not existing address'))
})

app.use(errorController)

export { app }