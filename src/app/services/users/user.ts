import { Address } from './address';

export class User {
    id: string;
    name: string;
    email: string;
    address: Array<Address>;
    imageUrl: string;
    constructor() {}
}
