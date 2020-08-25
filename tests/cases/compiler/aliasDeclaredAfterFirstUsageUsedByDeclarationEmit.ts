// @declaration: true
// @filename: init.ts
export interface A {
    a: true;
}

export interface B {
    b: true;
}

export function f(thing?: A | B): A | B { return null as any; };
// @filename: utils.ts
import {A, B} from "./init";

export type Either = A | B;
// @filename: usage.ts
import {Either} from "./utils";
import {f} from "./init";

export function doThing() {
    return f();
}