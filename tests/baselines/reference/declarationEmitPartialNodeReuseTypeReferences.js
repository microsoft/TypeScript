//// [tests/cases/compiler/declarationEmitPartialNodeReuseTypeReferences.ts] ////

//// [a.ts]
export type SpecialString = string;
type PrivateSpecialString = string;

export namespace N {
    export type SpecialString = string;
}
export const o = (p1: SpecialString, p2: PrivateSpecialString, p3: N.SpecialString) => null! as { foo: SpecialString, bar: PrivateSpecialString, baz: N.SpecialString };

//// [b.ts]
import * as a from "./a";
export const g = a.o

//// [c.ts]
import { o, SpecialString } from "./a";
export const g = o

//// [a.js]
export const o = (p1, p2, p3) => null;
//// [b.js]
import * as a from "./a";
export const g = a.o;
//// [c.js]
import { o } from "./a";
export const g = o;


//// [a.d.ts]
export type SpecialString = string;
type PrivateSpecialString = string;
export declare namespace N {
    type SpecialString = string;
}
export declare const o: (p1: SpecialString, p2: PrivateSpecialString, p3: N.SpecialString) => {
    foo: SpecialString;
    bar: PrivateSpecialString;
    baz: N.SpecialString;
};
export {};
//// [b.d.ts]
import * as a from "./a";
export declare const g: (p1: a.SpecialString, p2: string, p3: a.N.SpecialString) => {
    foo: a.SpecialString;
    bar: string;
    baz: a.N.SpecialString;
};
//// [c.d.ts]
import { SpecialString } from "./a";
export declare const g: (p1: SpecialString, p2: string, p3: import("./a").N.SpecialString) => {
    foo: SpecialString;
    bar: string;
    baz: import("./a").N.SpecialString;
};
