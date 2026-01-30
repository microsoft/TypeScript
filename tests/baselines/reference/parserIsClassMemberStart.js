//// [tests/cases/compiler/parserIsClassMemberStart.ts] ////

//// [parserIsClassMemberStart.ts]
class C {
    type!: number;
}


//// [parserIsClassMemberStart.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
