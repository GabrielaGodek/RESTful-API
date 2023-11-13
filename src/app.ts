import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import coffeesRoutes from './routes/coffeesRoutes'
import ErrorHandler, { HttpStatusCode } from './utils/errorHandler'
import errorController from './controllers/errorControllers'

const app = express();
app.use(json());
app.use('/api/v1/coffees', coffeesRoutes)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorHandler('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'not existing address'))
})

app.use(errorController)

export { app }