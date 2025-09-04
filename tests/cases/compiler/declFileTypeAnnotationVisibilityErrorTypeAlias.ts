// @target: ES5
// @module: commonjs
// @declaration: true

interface Window {
    someMethod();
}

namespace M {
    type W = Window | string;
    export namespace N {
        export class Window { }
        export var p: W; // Should report error that W is private
    }
}

namespace M1 {
    export type W = Window | string;
    export namespace N {
        export class Window { }
        export var p: W; // No error
    }
}

namespace M2 {
    class private1 {
    }
    class public1 {
    }
    namespace m3 {
        export class public1 {
        }
    }

    type t1 = private1;
    export type t2 = private1; // error

    type t11 = public1;
    export type t12 = public1;

    type t111 = m3.public1;
    export type t112 = m3.public1; // error
}
