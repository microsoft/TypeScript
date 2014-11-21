// @target: ES5
// @module: commonjs
// @declaration: true

module M {
    export type Value = string | number | boolean;
    export var x: Value;

    export class c {
    }

    export type C = c;

    export module m {
        export class c {
        }
    }

    export type MC = m.c;

    export type fc = () => c;
}

interface Window {
    someMethod();
}

module M {
    export type W = Window | string;
    export module N {
        export class Window { }
        export var p: W;
    }
}