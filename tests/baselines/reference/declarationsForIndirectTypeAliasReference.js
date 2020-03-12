//// [tests/cases/compiler/declarationsForIndirectTypeAliasReference.ts] ////

//// [b.ts]
export {
    Hash,
    StringHash, StringHash2
};

interface Hash<T> {
    [key: string]: T;
}

type StringHash = Hash<string>;

interface StringHash2 extends Hash<string> {}
//// [a.ts]
import {StringHash, StringHash2} from "./b";

export {
    doSome
}

const MAP: StringHash = {
    a: "a"
};

const MAP2: StringHash2 = {
    a: "a"
};

function doSome(arg1: string,
                arg2 = MAP,
                arg3 = MAP2) {
}

//// [b.js]
"use strict";
exports.__esModule = true;
//// [a.js]
"use strict";
exports.__esModule = true;
exports.doSome = void 0;
var MAP = {
    a: "a"
};
var MAP2 = {
    a: "a"
};
function doSome(arg1, arg2, arg3) {
    if (arg2 === void 0) { arg2 = MAP; }
    if (arg3 === void 0) { arg3 = MAP2; }
}
exports.doSome = doSome;


//// [b.d.ts]
export { Hash, StringHash, StringHash2 };
interface Hash<T> {
    [key: string]: T;
}
declare type StringHash = Hash<string>;
interface StringHash2 extends Hash<string> {
}
//// [a.d.ts]
import { StringHash, StringHash2 } from "./b";
export { doSome };
declare function doSome(arg1: string, arg2?: StringHash, arg3?: StringHash2): void;
