//// [a.ts]
export class Foo {
    foo: string;
}


//// [a.js]
"use strict";
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
