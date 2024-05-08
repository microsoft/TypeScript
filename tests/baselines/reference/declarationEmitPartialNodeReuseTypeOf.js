//// [tests/cases/compiler/declarationEmitPartialNodeReuseTypeOf.ts] ////

//// [a.ts]
export const nImported = "nImported"
export const nNotImported = "nNotImported"
const nPrivate = "private"
export const o = (p1: typeof nImported, p2: typeof nNotImported, p3: typeof nPrivate) => null! as { foo: typeof nImported, bar: typeof nPrivate, baz: typeof nNotImported }

//// [b.ts]
import { o, nImported } from "./a";
export const g = o
console.log(nImported);

//// [c.ts]
import * as a from "./a";
export const g = a.o


//// [a.js]
export const nImported = "nImported";
export const nNotImported = "nNotImported";
const nPrivate = "private";
export const o = (p1, p2, p3) => null;
//// [b.js]
import { o, nImported } from "./a";
export const g = o;
console.log(nImported);
//// [c.js]
import * as a from "./a";
export const g = a.o;


//// [a.d.ts]
export declare const nImported = "nImported";
export declare const nNotImported = "nNotImported";
declare const nPrivate = "private";
export declare const o: (p1: typeof nImported, p2: typeof nNotImported, p3: typeof nPrivate) => {
    foo: typeof nImported;
    bar: typeof nPrivate;
    baz: typeof nNotImported;
};
export {};
//// [b.d.ts]
import { nImported } from "./a";
export declare const g: (p1: typeof nImported, p2: typeof import("./a").nNotImported, p3: "private") => {
    foo: typeof nImported;
    bar: "private";
    baz: typeof import("./a").nNotImported;
};
//// [c.d.ts]
import * as a from "./a";
export declare const g: (p1: typeof a.nImported, p2: typeof a.nNotImported, p3: "private") => {
    foo: typeof a.nImported;
    bar: "private";
    baz: typeof a.nNotImported;
};
