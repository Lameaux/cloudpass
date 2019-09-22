import express from 'express';
import mongoose from 'mongoose';
import next from 'next';
import redirectToHttps from './redirectToHttps';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log('Connecting to MongoDB...');
const DEFAULT_MONGODB_URI = 'mongodb://localhost:27017/cloudpass_dev';

const databaseUrl = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => {
    console.log('Failed to connect to MongoDB: ' + error);
    process.exit(1);
  });

console.log('Booting...');
app.prepare().then(() => {
  console.log('Initializing...');
  const server = express();

  if (!dev) {
    server.use(redirectToHttps);
  }

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.use((err, req, res, next) => {
    console.error(err.stack);

    if (req.xhr) {
      res.status(500).send({ error: err });
      return;
    }

    next(err);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Listening at http://localhost:${port}`);
  });
});
