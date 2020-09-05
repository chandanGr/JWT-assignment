import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rTracer from 'cls-rtracer';
import mainRoute from './Routes/index';

const PORT = process.env.PORT || 8080;
process
    .on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at Promise:', reason, promise);
    })
    .on('uncaughtException', (error) => {
        console.error('Uncaught Exception thrown:', error);
        process.exit(1);
    });

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(rTracer.expressMiddleware());

app.use(cors());
app.use('/api/v1/', mainRoute);

app.listen(PORT, () => {
    console.info('Node server listening on port ' + PORT);
});
