//// [tests/cases/compiler/dottedNamesInSystem.ts] ////

//// [dottedNamesInSystem.ts]
export namespace A.B.C {
    export function foo() {}
}

export function bar() {
    return A.B.C.foo();
}

//// [dottedNamesInSystem.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
exports.bar = bar;
var A;
(function (A) {
    let B;
    (function (B) {
        let C;
        (function (C) {
            function foo() { }
            C.foo = foo;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (exports.A = A = {}));
function bar() {
    return A.B.C.foo();
}
