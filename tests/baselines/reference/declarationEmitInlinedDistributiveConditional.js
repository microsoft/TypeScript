//// [tests/cases/compiler/declarationEmitInlinedDistributiveConditional.ts] ////

//// [test.ts]
import {dropPrivateProps1, dropPrivateProps2} from './api';
const a = dropPrivateProps1({foo: 42, _bar: 'secret'}); // type is {foo: number}
//a._bar                                                // error: _bar does not exist           <===== as expected
const b = dropPrivateProps2({foo: 42, _bar: 'secret'}); // type is {foo: number, _bar: string}
//b._bar                                                // no error, type of b._bar is string   <===== NOT expected

//// [api.ts]
import {excludePrivateKeys1, excludePrivateKeys2} from './internal';
export const dropPrivateProps1 = <Obj>(obj: Obj) => excludePrivateKeys1(obj);
export const dropPrivateProps2 = <Obj>(obj: Obj) => excludePrivateKeys2(obj);

//// [internal.ts]
export declare function excludePrivateKeys1<Obj>(obj: Obj): {[K in PublicKeys1<keyof Obj>]: Obj[K]};
export declare function excludePrivateKeys2<Obj>(obj: Obj): {[K in PublicKeys2<keyof Obj>]: Obj[K]};
export type PublicKeys1<T> = T extends `_${string}` ? never : T;
type PublicKeys2<T>        = T extends `_${string}` ? never : T;

//// [internal.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [api.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropPrivateProps2 = exports.dropPrivateProps1 = void 0;
var internal_1 = require("./internal");
var dropPrivateProps1 = function (obj) { return (0, internal_1.excludePrivateKeys1)(obj); };
exports.dropPrivateProps1 = dropPrivateProps1;
var dropPrivateProps2 = function (obj) { return (0, internal_1.excludePrivateKeys2)(obj); };
exports.dropPrivateProps2 = dropPrivateProps2;
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
var a = (0, api_1.dropPrivateProps1)({ foo: 42, _bar: 'secret' }); // type is {foo: number}
//a._bar                                                // error: _bar does not exist           <===== as expected
var b = (0, api_1.dropPrivateProps2)({ foo: 42, _bar: 'secret' }); // type is {foo: number, _bar: string}
//b._bar                                                // no error, type of b._bar is string   <===== NOT expected


//// [internal.d.ts]
export declare function excludePrivateKeys1<Obj>(obj: Obj): {
    [K in PublicKeys1<keyof Obj>]: Obj[K];
};
export declare function excludePrivateKeys2<Obj>(obj: Obj): {
    [K in PublicKeys2<keyof Obj>]: Obj[K];
};
export type PublicKeys1<T> = T extends `_${string}` ? never : T;
type PublicKeys2<T> = T extends `_${string}` ? never : T;
export {};
//// [api.d.ts]
export declare const dropPrivateProps1: <Obj>(obj: Obj) => { [K in import("./internal").PublicKeys1<keyof Obj>]: Obj[K]; };
export declare const dropPrivateProps2: <Obj>(obj: Obj) => { [K in keyof Obj extends infer T ? T extends keyof Obj ? T extends `_${string}` ? never : T : never : never]: Obj[K]; };
//// [test.d.ts]
export {};
