//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/wrappedAndRecursiveConstraints2.ts] ////

//// [wrappedAndRecursiveConstraints2.ts]
class C<T extends C<T>> { // error
    constructor(x: T) { }
}

var c = new C(1);
var c = new C(new C('')); // error

//// [wrappedAndRecursiveConstraints2.js]
"use strict";
var C = /** @class */ (function () {
    function C(x) {
    }
    return C;
}());
var c = new C(1);
var c = new C(new C('')); // error
