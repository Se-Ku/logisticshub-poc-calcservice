import { Type, type Static } from '@sinclair/typebox';

export const ShippingRateInputSchema = Type.Object({
    dimensions: Type.Object({
        length: Type.Number({ minimum: 0.0001 }),
        width: Type.Number({ minimum: 0.0001 }),
        height: Type.Number({ minimum: 0.0001 })
    }),
    weight: Type.Number({ minimum: 0.0001 }),
    destinationCountry: Type.String({ minLength: 1 })
});

export const ShippingRateOutputSchema = Type.Object({
    rate: Type.Number(),
    calculationId: Type.String()
});

export type ShippingRateInput = Static<typeof ShippingRateInputSchema>;
export type ShippingRateOutput = Static<typeof ShippingRateOutputSchema>;