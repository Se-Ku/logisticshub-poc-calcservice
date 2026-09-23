import crypto from 'node:crypto';
import type { ShippingRateInput, ShippingRateOutput } from '../schemas/shippingRate.schema.ts';

function roundHalfUp(value: number, decimals: number = 2): number {
    const factor = Math.pow(10, decimals);
    return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function calculateShippingRate(data: ShippingRateInput): ShippingRateOutput {
    const { dimensions, weight } = data;
    const volumetricWeight = (dimensions.length * dimensions.width * dimensions.height) / 5000;
    const billableWeight = Math.max(weight, volumetricWeight);

    const baseRate = 12.50;
    const rawRate = baseRate + (billableWeight * 1.75);
    const rate = roundHalfUp(rawRate, 2);

    const calculationId = `calc_${crypto.randomUUID()}`;

    return { rate, calculationId };
}