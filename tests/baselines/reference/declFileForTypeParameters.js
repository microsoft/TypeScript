//// [tests/cases/compiler/declFileForTypeParameters.ts] ////

//// [declFileForTypeParameters.ts]
class C<T> {
    x: T;
    foo(a: T): T {
        return this.x;
    }
}

//// [declFileForTypeParameters.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (a) {
        return this.x;
    };
    return C;
}());


//// [declFileForTypeParameters.d.ts]
declare class C<T> {
    x: T;
    foo(a: T): T;
}
