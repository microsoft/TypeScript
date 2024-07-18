//// [tests/cases/conformance/types/keyof/satisfiesKeyof1.ts] ////

//// [satisfiesKeyof1.ts]
// intended usage
const x = Symbol();

export class Foo {
    [x satisfies keyof]() {
        return 1;
    }
}

export const usage1 = new Foo()[x]();

// errors on missing
import {y} from "missing";
export class Bar {
    [y satisfies keyof]() {
        return 1;
    }
}

export const usage2 = new Bar()[y]();

// errors on wrong types
const z = Math.random() ? 1 : "a";
export class Baz {
    [z satisfies keyof]() {
        return 1;
    }
}

export const usage3 = new Baz()[z]();

// error on satisfies keyof outside computed name

export const a = 0 satisfies keyof;


//// [satisfiesKeyof1.js]
// intended usage
const x = Symbol();
export class Foo {
    [x]() {
        return 1;
    }
}
export const usage1 = new Foo()[x]();
// errors on missing
import { y } from "missing";
export class Bar {
    [y]() {
        return 1;
    }
}
export const usage2 = new Bar()[y]();
// errors on wrong types
const z = Math.random() ? 1 : "a";
export class Baz {
    [z]() {
        return 1;
    }
}
export const usage3 = new Baz()[z]();
// error on satisfies keyof outside computed name
export const a = 0;


//// [satisfiesKeyof1.d.ts]
declare const x: unique symbol;
export declare class Foo {
    [x](): number;
}
export declare const usage1: number;
import { y } from "missing";
export declare class Bar {
    [y](): number;
}
export declare const usage2: number;
declare const z: string | number;
export declare class Baz {
    [z](): number;
}
export declare const usage3: number;
export declare const a = 0;
export {};
