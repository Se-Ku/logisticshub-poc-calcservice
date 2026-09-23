import Fastify, { type FastifyServerOptions, type FastifyError } from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import authPlugin from './plugins/auth.ts';
import shippingRoutes from './routes/shipping.ts';

export function buildApp(opts: FastifyServerOptions = {}) {
    const app = Fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

    app.register(authPlugin);
    app.register(shippingRoutes);

    app.setErrorHandler((error: FastifyError, request, reply) => {
        if (error.validation) {
            return reply.code(400).send({
                code: 'ERR_INVALID_SCHEMA',
                message: 'Validation failed',
                details: error.validation
            });
        }

        if (reply.statusCode === 401) {
            return; // Handled by auth plugin
        }

        request.log.error(error);
        return reply.code(error.statusCode || 500).send({
            code: error.code || 'ERR_CALCULATION_FAILED',
            message: error.message || 'Internal server error'
        });
    });

    return app;
}