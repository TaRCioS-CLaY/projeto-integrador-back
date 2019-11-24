import express from 'express';
import routes from './routes';
import cors from 'cors';
import { monitorarbanco, monitorarRelatorios } from './services/email.service';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

monitorarRelatorios();
monitorarbanco();

export default app;

