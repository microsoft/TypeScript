//// [tests/cases/compiler/circularReferenceInImport.ts] ////

//// [db.d.ts]
declare namespace Db {
    export import Types = Db;
}

export = Db;

//// [app.ts]
import * as Db from "./db"

export function foo() {
    return new Object()
}

//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    return new Object();
}


//// [app.d.ts]
export declare function foo(): Object;
