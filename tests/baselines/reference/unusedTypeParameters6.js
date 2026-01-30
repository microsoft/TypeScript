//// [tests/cases/compiler/unusedTypeParameters6.ts] ////

//// [a.ts]
class C<T> { }

//// [b.ts]
interface C<T> { a: T; }

//// [a.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
//// [b.js]
"use strict";
