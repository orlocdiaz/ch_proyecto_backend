import express from 'express';
import router from './routes/index.router.js';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
/* app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
}); */

app.listen(port, () => {
  console.log(`Conectado al puerto: http://localhost:${port}`);
});
