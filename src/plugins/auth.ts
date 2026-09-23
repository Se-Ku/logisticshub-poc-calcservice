import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

export default fp(async function authPlugin(fastify: FastifyInstance) {
    fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
        const apiKey = request.headers['x-api-key'];
        const allowedKeys = (process.env.ALLOWED_API_KEYS || '')
            .split(',')
            .map((key) => key.trim())
            .filter(Boolean);

        const authKey = Array.isArray(apiKey) ? apiKey[0] : apiKey;

        if (!authKey || !allowedKeys.includes(authKey)) {
            reply.code(401).send({
                code: 'ERR_UNAUTHORIZED',
                message: 'Invalid or missing API key'
            });
        }
    });
});