// @target: ES5
// @module: commonjs
// @declaration: true

namespace M {
    export type Value = string | number | boolean;
    export var x: Value;

    export class c {
    }

    export type C = c;

    export namespace m {
        export class c {
        }
    }

    export type MC = m.c;

    export type fc = () => c;
}

interface Window {
    someMethod();
}

namespace M {
    export type W = Window | string;
    export namespace N {
        export class Window { }
        export var p: W;
    }
}