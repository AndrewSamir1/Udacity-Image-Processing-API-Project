import express from 'express';
import resizeImage from './api/resizeImage';

const routes = express.Router();

routes.use('/api/resize', resizeImage);

routes.get('/', (req, res): void => {
  res.send('Hello');
});

export default routes;
