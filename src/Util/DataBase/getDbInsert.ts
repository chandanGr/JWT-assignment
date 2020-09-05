import { Db, InsertOneWriteOpResult } from 'mongodb';

export default (database: Db, collection: string, insertObject: Object): Promise<InsertOneWriteOpResult<any>> => {
    return new Promise((resolve, reject) => {
        database
            .collection(collection)
            .insertOne(insertObject)
            .then((result) => {
                resolve(result);
            })
            .catch((err: Error) => {
                reject(err);
            });
    });
};
