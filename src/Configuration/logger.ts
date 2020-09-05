import rTracer from 'cls-rtracer';

import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const rTracerFormat = printf((info) => {
    const rid = rTracer.id();
    return rid ? `${info.timestamp} ${info.level} [request-id:${rid}]: ${info.message}` : `${info.timestamp} ${info.level}: ${info.message}`;
});

export const logger = createLogger({
    format: combine(timestamp(), rTracerFormat),
    transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'server.log' }),
    ],
});
