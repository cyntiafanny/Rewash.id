import {Item} from './item-model';

export class OrderDetail {
    SPECIAL: Array<Item>;
    NORMAL: Array<Item>;
    OTHERS: Array<Item>;
    DETAIL: {
        ORDERID: string,
        ADDITIONALS: {
            SCENT: string;
            REQUEST_BAG: boolean;
            NOTES: string;
        }
        PRICE: Array<
            {
                NAME: string,
                PRICE: number
            }
        >;
        WEIGHT: object;
        SHIPPING: {
            DELIVERYTD: string;
            PICKUPTD: string;
            ORIGIN: string;
            DESTINATION: string;
            USERID: string;
            OUTLETID: string;
            NOTES: string;
        },
        PROGRESS: Array<{
            NAME: string,
            STATUS: boolean
        }>
    };
    constructor(
        SPECIAL: {},
        NORMAL: {},
        OTHERS: {},
        DETAIL: {
            ORDERID: '',
            PRICE: [],
            WEIGHT: {},
            SHIPPING: {},
            PROGRESS: []
        }
    ) {}
}
