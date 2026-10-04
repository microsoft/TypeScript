// @module: commonjs
// @target: es2022
// @strict: true
// @noEmit: true

// @filename: a.d.ts
declare namespace A {
    class Base<T> {
        a: T;
    }
}

declare namespace B {
    class Base<T> {
        b: T;
    }
}

declare module "m" {
    export class Base<T> {
        top: T;
    }

    const value: typeof A | typeof B;

    export = value;
}

// @filename: b.ts
import { Base } from "m";

class Derived extends Base<string> {}
