// @declaration: true

// @filename: db.d.ts
declare namespace Db {
    export import Types = Db;
}

export = Db;

// @filename: app.ts
import * as Db from "./db"

export function foo() {
    return new Object()
}