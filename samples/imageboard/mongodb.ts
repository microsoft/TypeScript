///<reference path='../node/node.d.ts' />

declare module "mongodb" {
    export class Server {
        constructor(host: string, port: number, opts?: any, moreopts?: any);
    }
    export class Db {
        constructor(databaseName: string, serverConfig: Server);
        public open(callback: ()=>void);
        public collection(name: string, callback: (err: any, collection: MongoCollection) => void);    
    }
    export class ObjectID {
        constructor(s: string);
    }
}


interface MongoDb {
    
}

interface MongoCollection {
    find(query: any): MongoCursor;
    find(query: any, callback?: (err: any, result: any) => void): MongoCursor;
    find(query: any, select: any, callback?: (err: any, result: any) => void): MongoCursor;
    findOne(query: any, callback: (err: any, result: any) => void): void;
    update(query: any, updates: any, callback: (err: any, result: any) => void): void;
    insert(query: any, callback: (err: any, result: any) => void): void;
}

interface MongoCursor {
    toArray(callback: (err: any, results: any[]) => void);
}
