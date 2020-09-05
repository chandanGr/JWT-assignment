import { Db, MongoError } from "mongodb";

export default (
  database: Db,
  collection: string,
  query: Object,
  projection?: Object,
  limit: number = 0,
  sort: Object = {}
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    database
      .collection(collection)
      .find(query, projection)
      //@ts-ignore
      .sort(sort)
      .limit(limit)
      .toArray((err: MongoError, response: Object[]) => {
        if (err) reject(err);
        else resolve(response);
      });
  });
};
