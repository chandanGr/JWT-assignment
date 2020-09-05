import dbConnection from './dbConnection';
import dbInsert from './getDbInsert';

import { logger } from '../../Configuration/logger';

export default (collection: string, insertObject: Object) => {
    return new Promise((resolve, reject) => {
        let randomId = Math.floor(Math.random() * Math.floor(1000));
        logger.info(`Making a DB request: ${randomId}`);
        dbConnection()
            .then((database) => {
                dbInsert(database, collection, insertObject)
                    .then((result) => {
                        logger.info(`Got response to a DB request: ${randomId}`);
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
};
