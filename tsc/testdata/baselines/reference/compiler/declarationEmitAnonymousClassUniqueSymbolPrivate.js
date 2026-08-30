//// [tests/cases/compiler/declarationEmitAnonymousClassUniqueSymbolPrivate.ts] ////

//// [helper.ts]
declare const brand: unique symbol;

class Foo {
    private [brand]: number = 1;
}

export function makeFoo() {
    return new Foo();
}

//// [index.ts]
import { makeFoo } from "./helper";

export const f = () => makeFoo();


//// [helper.js]
class Foo {
    [brand] = 1;
}
export function makeFoo() {
    return new Foo();
}
//// [index.js]
import { makeFoo } from "./helper";
export const f = () => makeFoo();


//// [helper.d.ts]
declare const brand: unique symbol;
declare class Foo {
    private [brand];
}
export declare function makeFoo(): Foo;
export {};
