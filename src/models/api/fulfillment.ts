export type FulfillmentMethod = "DELIVERY" | "PACKSTATION" | "PICKUP" | "SHIP_FROM_OUTLET";

export interface Fulfillment {
    method: string;
    amount: {
        currency: string;
        price: number;
    };
    promise: {
        earliest: string;
        latest: string;
    };
    selected: boolean;
    hasScheduledAvailability: boolean;
}
