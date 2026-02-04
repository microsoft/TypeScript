//// [tests/cases/compiler/declFileTypeAnnotationTypeAlias.ts] ////

//// [declFileTypeAnnotationTypeAlias.ts]
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

//// [declFileTypeAnnotationTypeAlias.js]
"use strict";
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


//// [declFileTypeAnnotationTypeAlias.d.ts]
declare namespace M {
    type Value = string | number | boolean;
    var x: Value;
    class c {
    }
    type C = c;
    namespace m {
        class c {
        }
    }
    type MC = m.c;
    type fc = () => c;
}
interface Window {
    someMethod(): any;
}
declare namespace M {
    type W = Window | string;
    namespace N {
        class Window {
        }
        var p: W;
    }
}
