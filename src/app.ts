import express from 'express';
import { json } from 'body-parser';
import coffeesRoutes from './routes/coffeesRoutes'

const PORT = 3000;

const app = express();
app.use(json());

app.use('/api/v1/coffees', coffeesRoutes)


// app.listen(PORT, () => {
//     console.log('Connected to server');
// })

export { app }