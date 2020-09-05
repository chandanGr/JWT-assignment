import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve('.env') });

export const conf = {
    IP: process.env.IP,
    environment: process.env.environment, // boolean of dev or prod
    url: process.env.url_env, //db url
    dbName: process.env.dbName_env, //db name
    userName: process.env.userName_env, // db username
    password: process.env.password_env, // db password
    PORT: process.env.database_port_env, //db PORT
};
