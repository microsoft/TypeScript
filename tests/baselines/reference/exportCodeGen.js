//// [exportCodeGen.ts]
// should replace all refs to 'x' in the body,
// with fully qualified
module A {
    export var x = 12;
    function lt12() {
        return x < 12;
    }
} 

// should not fully qualify 'x'
module B {
    var x = 12;
    function lt12() {
        return x < 12;
    }
}

// not copied, since not exported
module C {
    function no() {
        return false;
    }
}

// copies, since exported
module D {
    export function yes() {
        return true;
    }
}

// validate all exportable statements
module E {
    export enum Color { Red }
    export function fn() { }
    export interface I { id: number }
    export class C { name: string }
    export module M {
        export var x = 42;
    }
}

// validate all exportable statements,
// which are not exported
module F {
    enum Color { Red }
    function fn() { }
    interface I { id: number }
    class C { name: string }
    module M {
        var x = 42;
    }
}

//// [exportCodeGen.js]
// should replace all refs to 'x' in the body,
// with fully qualified
var A = A || (A = {});
(function (A) {
    A.x = 12;
    function lt12() {
        return A.x < 12;
    }
})(A);
// should not fully qualify 'x'
var B = B || (B = {});
(function (B) {
    var x = 12;
    function lt12() {
        return x < 12;
    }
})(B);
// not copied, since not exported
var C = C || (C = {});
(function (C) {
    function no() {
        return false;
    }
})(C);
// copies, since exported
var D = D || (D = {});
(function (D) {
    function yes() {
        return true;
    }
    D.yes = yes;
})(D);
// validate all exportable statements
var E = E || (E = {});
(function (E) {
    var Color = E.Color || (E.Color = {});
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
    })(Color);
    function fn() { }
    E.fn = fn;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    E.C = C;
    var M = E.M || (E.M = {});
    (function (M) {
        M.x = 42;
    })(M);
})(E);
// validate all exportable statements,
// which are not exported
var F = F || (F = {});
(function (F) {
    var Color = Color || (Color = {});
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
    })(Color);
    function fn() { }
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    var M = M || (M = {});
    (function (M) {
        var x = 42;
    })(M);
})(F);
