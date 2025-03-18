//// [tests/cases/compiler/declFileTypeAnnotationTypeAlias.ts] ////

//// [declFileTypeAnnotationTypeAlias.ts]
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

//// [declFileTypeAnnotationTypeAlias.js]
var M;
(function (M) {
    class c {
    }
    M.c = c;
    let m;
    (function (m) {
        class c {
        }
        m.c = c;
    })(m = M.m || (M.m = {}));
})(M || (M = {}));
(function (M) {
    let N;
    (function (N) {
        class Window {
        }
        N.Window = Window;
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
