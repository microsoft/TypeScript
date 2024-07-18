// @declaration: true
// @target: es6
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
