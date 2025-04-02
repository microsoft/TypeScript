//// [tests/cases/compiler/exportVisibility.ts] ////

//// [exportVisibility.ts]
export class Foo {
}

export var foo = new Foo();

export function test(foo: Foo) {
    return true;
}


//// [exportVisibility.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = exports.Foo = void 0;
exports.test = test;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
exports.foo = new Foo();
function test(foo) {
    return true;
}
