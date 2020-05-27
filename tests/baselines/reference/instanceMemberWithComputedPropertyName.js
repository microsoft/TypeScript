//// [instanceMemberWithComputedPropertyName.ts]
// https://github.com/microsoft/TypeScript/issues/30953
"use strict";
const x = 1;
class C {
    [x] = true;
    constructor() {
        const { a, b } = { a: 1, b: 2 };
    }
}

//// [instanceMemberWithComputedPropertyName.js]
// https://github.com/microsoft/TypeScript/issues/30953
"use strict";
var _a;
var x = 1;
var C = /** @class */ (function () {
    function C() {
        this[_a] = true;
        var _b = { a: 1, b: 2 }, a = _b.a, b = _b.b;
    }
    return C;
}());
_a = x;
