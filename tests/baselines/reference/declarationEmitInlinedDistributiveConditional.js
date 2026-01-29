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
export {};
//// [api.js]
import { excludePrivateKeys1, excludePrivateKeys2 } from './internal';
export const dropPrivateProps1 = (obj) => excludePrivateKeys1(obj);
export const dropPrivateProps2 = (obj) => excludePrivateKeys2(obj);
//// [test.js]
import { dropPrivateProps1, dropPrivateProps2 } from './api';
const a = dropPrivateProps1({ foo: 42, _bar: 'secret' }); // type is {foo: number}
//a._bar                                                // error: _bar does not exist           <===== as expected
const b = dropPrivateProps2({ foo: 42, _bar: 'secret' }); // type is {foo: number, _bar: string}
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
