import { ObjectID } from 'mongodb';

export interface User {
    _id: ObjectID;
    name: string;
    email: string;
    mobile: string;
    password: string;
    encrypted_password: string;
    created_at: Date;
}
