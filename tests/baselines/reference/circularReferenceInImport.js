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
exports.__esModule = true;
exports.foo = void 0;
function foo() {
    return new Object();
}
exports.foo = foo;


//// [app.d.ts]
export declare function foo(): Object;
