import { Db } from 'mongodb';
import dbConnection from './dbConnection';
import getDbRead from './getDbRead';

import { logger } from '../../Configuration/logger';

export default async (collection: string, query: Object, projection?: Object, limit: number = 0, sort: Object = {}): Promise<Array<any>> => {
    logger.info(`Making a DB request`);

    return new Promise((resolve, reject) => {
        dbConnection()
            .then((database: Db) => {
                getDbRead(database, collection, query, projection, limit, sort)
                    .then((res) => {
                        logger.info(`got response to the DB request`);

                        resolve(res);
                    })
                    .catch((err: Error) => {
                        reject(err);
                    });
            })
            .catch((err: Error) => {
                reject(err);
            });
    });
};
