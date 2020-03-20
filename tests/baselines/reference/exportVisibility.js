//// [exportVisibility.ts]
export class Foo {
}

export var foo = new Foo();

export function test(foo: Foo) {
    return true;
}


//// [exportVisibility.js]
"use strict";
exports.__esModule = true;
exports.test = exports.foo = exports.Foo = void 0;
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
exports.test = test;
