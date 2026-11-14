//// [tests/cases/compiler/isolatedDeclarationsAddUndefined.ts] ////

//// [file1.ts]
type N = 1;
export class Bar {
    c? = [2 as N] as const;
    c3? = 1 as N;
    readonly r = 1;
    f = 2;
}

//// [file2.ts]
export function foo(p = (ip = 10, v: number): void => {}): void{
}
type T = number
export function foo2(p = (ip = 10 as T, v: number): void => {}): void{}
export class Bar2 {
    readonly r = 1;
    f = 2;
}

//// [file3.ts]
type T = number;
export const intersection = (p = 1 as number & (T | undefined), required: number): void => {};
export const reversedIntersection = (p = 1 as (T | undefined) & number, required: number): void => {};
export const possiblyUndefinedIntersection = (p = undefined as (T | undefined) & (number | undefined), required: number): void => {};
export const anyIntersection = (p = "" as any & (T | undefined), required: number): void => {};
export const unknownIntersection = (p = undefined as unknown & (T | undefined), required: number): void => {};
export const neverIntersection = (p = undefined as never & (T | undefined), required: number): void => {};
type MaybeNumber = number | undefined;
export const aliasIntersection = (p = 1 as MaybeNumber & (T | undefined), required: number): void => {};

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
class Bar {
    constructor() {
        this.c = [2];
        this.c3 = 1;
        this.r = 1;
        this.f = 2;
    }
}
exports.Bar = Bar;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar2 = void 0;
exports.foo = foo;
exports.foo2 = foo2;
function foo(p = (ip = 10, v) => { }) {
}
function foo2(p = (ip = 10, v) => { }) { }
class Bar2 {
    constructor() {
        this.r = 1;
        this.f = 2;
    }
}
exports.Bar2 = Bar2;
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliasIntersection = exports.neverIntersection = exports.unknownIntersection = exports.anyIntersection = exports.possiblyUndefinedIntersection = exports.reversedIntersection = exports.intersection = void 0;
const intersection = (p = 1, required) => { };
exports.intersection = intersection;
const reversedIntersection = (p = 1, required) => { };
exports.reversedIntersection = reversedIntersection;
const possiblyUndefinedIntersection = (p = undefined, required) => { };
exports.possiblyUndefinedIntersection = possiblyUndefinedIntersection;
const anyIntersection = (p = "", required) => { };
exports.anyIntersection = anyIntersection;
const unknownIntersection = (p = undefined, required) => { };
exports.unknownIntersection = unknownIntersection;
const neverIntersection = (p = undefined, required) => { };
exports.neverIntersection = neverIntersection;
const aliasIntersection = (p = 1, required) => { };
exports.aliasIntersection = aliasIntersection;


//// [file1.d.ts]
type N = 1;
export declare class Bar {
    c?: readonly [1] | undefined;
    c3?: N;
    readonly r = 1;
    f: number;
}
export {};
//// [file3.d.ts]
type T = number;
export declare const intersection: (p: (number & (T | undefined)) | undefined, required: number) => void;
export declare const reversedIntersection: (p: ((T | undefined) & number) | undefined, required: number) => void;
export declare const possiblyUndefinedIntersection: (p: (T | undefined) & (number | undefined), required: number) => void;
export declare const anyIntersection: (p: (any & (T | undefined)) | undefined, required: number) => void;
export declare const unknownIntersection: (p: (unknown & (T | undefined)) | undefined, required: number) => void;
export declare const neverIntersection: (p: (never & (T | undefined)) | undefined, required: number) => void;
type MaybeNumber = number | undefined;
export declare const aliasIntersection: (p: MaybeNumber & (T | undefined), required: number) => void;
export {};
