//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyNamedPrototype.ts] ////

//// [propertyNamedPrototype.ts]
class C {
    prototype: number; // ok
    static prototype: C; // error
}

//// [propertyNamedPrototype.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
