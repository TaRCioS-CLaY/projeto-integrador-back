import express from 'express';
import routes from './routes';
import cors from 'cors';
import { monitorarbanco, enviarRelatorios } from './services/email.service';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

enviarRelatorios();
monitorarbanco();

export default app;

