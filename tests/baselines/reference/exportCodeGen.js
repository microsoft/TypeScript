//// [tests/cases/conformance/internalModules/codeGeneration/exportCodeGen.ts] ////

//// [exportCodeGen.ts]
// should replace all refs to 'x' in the body,
// with fully qualified
namespace A {
    export var x = 12;
    function lt12() {
        return x < 12;
    }
} 

// should not fully qualify 'x'
namespace B {
    var x = 12;
    function lt12() {
        return x < 12;
    }
}

// not copied, since not exported
namespace C {
    function no() {
        return false;
    }
}

// copies, since exported
namespace D {
    export function yes() {
        return true;
    }
}

// validate all exportable statements
namespace E {
    export enum Color { Red }
    export function fn() { }
    export interface I { id: number }
    export class C { name: string }
    export namespace M {
        export var x = 42;
    }
}

// validate all exportable statements,
// which are not exported
namespace F {
    enum Color { Red }
    function fn() { }
    interface I { id: number }
    class C { name: string }
    namespace M {
        var x = 42;
    }
}

//// [exportCodeGen.js]
// should replace all refs to 'x' in the body,
// with fully qualified
var A;
(function (A) {
    A.x = 12;
    function lt12() {
        return A.x < 12;
    }
})(A || (A = {}));
// should not fully qualify 'x'
var B;
(function (B) {
    var x = 12;
    function lt12() {
        return x < 12;
    }
})(B || (B = {}));
// not copied, since not exported
var C;
(function (C) {
    function no() {
        return false;
    }
})(C || (C = {}));
// copies, since exported
var D;
(function (D) {
    function yes() {
        return true;
    }
    D.yes = yes;
})(D || (D = {}));
// validate all exportable statements
var E;
(function (E) {
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
    })(Color = E.Color || (E.Color = {}));
    function fn() { }
    E.fn = fn;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    E.C = C;
    var M;
    (function (M) {
        M.x = 42;
    })(M = E.M || (E.M = {}));
})(E || (E = {}));
// validate all exportable statements,
// which are not exported
var F;
(function (F) {
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
    })(Color || (Color = {}));
    function fn() { }
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    var M;
    (function (M) {
        var x = 42;
    })(M || (M = {}));
})(F || (F = {}));
