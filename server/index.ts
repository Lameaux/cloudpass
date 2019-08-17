import express from 'express';
import next from 'next';
import redirectToHttps from "./redirectToHttps";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log('Booting...');
app.prepare().then(() => {
    console.log('Initializing...');
    const server = express();

    if (!dev) {
        server.use(redirectToHttps);
    }

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Listening at http://localhost:${port}`)
    });
});
