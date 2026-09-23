import { buildApp } from './src/app.ts';

const app = buildApp({
    logger: {
        level: process.env.LOG_LEVEL || 'info'
    },
    requestIdHeader: 'x-request-id'
});

const start = async () => {
    try {
        const port = Number(process.env.PORT) || 3000;
        const host = process.env.HOST || '0.0.0.0';
        await app.listen({ port, host });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();