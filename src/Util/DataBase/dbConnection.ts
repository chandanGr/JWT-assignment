import mongodb from 'mongodb';
import { dbconfig } from '../../Configuration/databaseConfig';

const { MongoClient } = mongodb;

interface Result {
    err: Error | null;
    res: mongodb.Db | null;
}

let result: Result = {
    err: null,
    res: null,
};

const url = () => {
    return `mongodb://${dbconfig.url}:${dbconfig.PORT}/${dbconfig.dbName}`;
};

export const mongoConnection = () => {
    return MongoClient.connect(url(), {
        useNewUrlParser: true,
    });
};

export default async (): Promise<mongodb.Db> => {
    if (result.err === null && result.res === null) {
        await mongoConnection()
            .then((db) => {
                result.res = db.db(dbconfig.dbName);
            })
            .catch((err: Error) => {
                console.error('database connection failed');
                result.err = err;
            });
    }
    return new Promise((resolve, reject) => {
        if (result.res) {
            resolve(result.res);
        } else if (result.err) {
            reject(result.err);
        }
    });
};
