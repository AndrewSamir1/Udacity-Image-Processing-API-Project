import express from 'express';
import routes from './routes/index';
const app = express();

app.use(routes);

app.listen(3000, async (): Promise<void> => {
  console.log('Listening on Port 3000!');
});

export default app;
