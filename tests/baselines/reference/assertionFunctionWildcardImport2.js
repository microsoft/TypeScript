//// [tests/cases/compiler/assertionFunctionWildcardImport2.ts] ////

//// [asserts.ts]
function isNonNullable<T>(obj: T): asserts obj is NonNullable<T> {
    if (obj === undefined || obj === null) {
        throw new Error("Must not be a nullable value");
    }
}

export {
    isNonNullable
};

//// [test.ts]
import * as asserts from "./asserts";

function test(obj: string | null): void {
    asserts.isNonNullable(obj);
    obj.trim();
}


//// [asserts.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNonNullable = isNonNullable;
function isNonNullable(obj) {
    if (obj === undefined || obj === null) {
        throw new Error("Must not be a nullable value");
    }
}
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asserts = require("./asserts");
function test(obj) {
    asserts.isNonNullable(obj);
    obj.trim();
}
