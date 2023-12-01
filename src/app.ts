import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { json } from 'body-parser';
import cors, { CorsOptionsDelegate } from 'cors';
import coffeesRoutes from './routes/coffeesRoutes'
import ErrorHandler, { HttpStatusCode } from './utils/errorHandler'
import errorController from './controllers/errorControllers'

const app = express();
app.use(json());
app.use(cors())
app.options('*', cors())

const corsOptionsDelegate: CorsOptionsDelegate<Request> = (req, callback) => {
  const allowlist: string[] = ['http://localhost:5173', 'https://lazycup.vercel.app', 'http://localhost:3000'];

  let corsOptions;
  if (allowlist.indexOf(req.header('Origin') || '') !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use('/api/v1/coffees', cors(corsOptionsDelegate), coffeesRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorHandler('NOT FOUND', HttpStatusCode.NOT_FOUND, true, 'not existing address'))
})

app.use(errorController)

export { app }