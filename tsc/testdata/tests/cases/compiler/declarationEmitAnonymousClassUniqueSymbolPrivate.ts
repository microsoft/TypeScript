// @declaration: true
// @filename: helper.ts
declare const brand: unique symbol;

class Foo {
    private [brand]: number = 1;
}

export function makeFoo() {
    return new Foo();
}

// @filename: index.ts
import { makeFoo } from "./helper";

export const f = () => makeFoo();
