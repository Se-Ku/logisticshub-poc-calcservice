import type { FastifyInstance } from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { ShippingRateInputSchema, ShippingRateOutputSchema } from '../schemas/shippingRate.schema.ts';
import { calculateShippingRate } from '../services/calculator.service.ts';

export default async function shippingRoutes(fastify: FastifyInstance) {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

    server.post('/shipping/calculate-rates', {
        schema: {
            body: ShippingRateInputSchema,
            response: {
                200: ShippingRateOutputSchema
            }
        },
        preHandler: [fastify.authenticate],
        handler: async (request) => {
            return calculateShippingRate(request.body);
        }
    });
}