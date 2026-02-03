//// [tests/cases/compiler/declFileTypeAnnotationVisibilityErrorTypeAlias.ts] ////

//// [declFileTypeAnnotationVisibilityErrorTypeAlias.ts]
interface Window {
    someMethod();
}

module M {
    type W = Window | string;
    export module N {
        export class Window { }
        export var p: W; // Should report error that W is private
    }
}

module M1 {
    export type W = Window | string;
    export module N {
        export class Window { }
        export var p: W; // No error
    }
}

module M2 {
    class private1 {
    }
    class public1 {
    }
    module m3 {
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


//// [declFileTypeAnnotationVisibilityErrorTypeAlias.js]
var M;
(function (M) {
    var N;
    (function (N) {
        var Window = /** @class */ (function () {
            function Window() {
            }
            return Window;
        }());
        N.Window = Window;
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
var M1;
(function (M1) {
    var N;
    (function (N) {
        var Window = /** @class */ (function () {
            function Window() {
            }
            return Window;
        }());
        N.Window = Window;
    })(N = M1.N || (M1.N = {}));
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    var private1 = /** @class */ (function () {
        function private1() {
        }
        return private1;
    }());
    var public1 = /** @class */ (function () {
        function public1() {
        }
        return public1;
    }());
    var m3;
    (function (m3) {
        var public1 = /** @class */ (function () {
            function public1() {
            }
            return public1;
        }());
        m3.public1 = public1;
    })(m3 || (m3 = {}));
})(M2 || (M2 = {}));


//// [declFileTypeAnnotationVisibilityErrorTypeAlias.d.ts]
interface Window {
    someMethod(): any;
}
declare namespace M {
    type W = Window | string;
    export namespace N {
        class Window {
        }
        var p: W;
    }
    export {};
}
declare namespace M1 {
    type W = Window | string;
    namespace N {
        class Window {
        }
        var p: W;
    }
}
declare namespace M2 {
    class private1 {
    }
    class public1 {
    }
    namespace m3 {
        class public1 {
        }
    }
    export type t2 = private1;
    export type t12 = public1;
    export type t112 = m3.public1;
    export {};
}
