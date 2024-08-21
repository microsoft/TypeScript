//// [tests/cases/compiler/declarationEmitPartialReuseComputedProperty.ts] ////

//// [a.ts]
export const n = "A"
export const poz = 1;
export const neg = -1;
export const o = () => null! as { [n]: string, foo: string, [poz]: number, [neg]: number }

//// [b.ts]
import { o } from "./a";
export const g = o

//// [a.js]
export const n = "A";
export const poz = 1;
export const neg = -1;
export const o = () => null;
//// [b.js]
import { o } from "./a";
export const g = o;


//// [a.d.ts]
export declare const n = "A";
export declare const poz = 1;
export declare const neg = -1;
export declare const o: () => {
    [n]: string;
    foo: string;
    [poz]: number;
    [neg]: number;
};
//// [b.d.ts]
export declare const g: () => {
    A: string;
    foo: string;
    1: number;
    [-1]: number;
};
