//// [instanceMemberWithComputedPropertyName.ts]
// https://github.com/microsoft/TypeScript/issues/30953
const x = 1;
class C {
    [x] = true;
    constructor() {
        const { a, b } = { a: 1, b: 2 };
    }
}

//// [instanceMemberWithComputedPropertyName.js]
var _a;
// https://github.com/microsoft/TypeScript/issues/30953
var x = 1;
var C = /** @class */ (function () {
    function C() {
        this[_a] = true;
        var _b = { a: 1, b: 2 }, a = _b.a, b = _b.b;
    }
    return C;
}());
_a = x;
