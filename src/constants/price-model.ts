export class PriceDetail {
    SPECIAL: object;
    NORMAL: object;
    OTHERS: object;
    DETAIL: {
        PRICE: Array<
            {
                name: string,
                price: number
            }
        >;
        WEIGHT: object;
    };
    constructor(
        SPECIAL: {},
        NORMAL: {},
        OTHERS: {},
        DETAIL: {
            PRICE: [],
            WEIGHT: {}
        }
    ) {}
}
