//// [tests/cases/compiler/parameterReferenceInInitializer1.ts] ////

//// [parameterReferenceInInitializer1.ts]
function fn<a>(y: Y, set: (y: Y, x: number) => void): a {
    return undefined;
}
interface Y { x: number }

class C {
    constructor(
        y: Y,
        public x = fn(y, (y, x) => y.x = x) // expected to work, but actually doesn't
    ) {
    }
}

//// [parameterReferenceInInitializer1.js]
function fn(y, set) {
    return undefined;
}
var C = /** @class */ (function () {
    function C(y, x // expected to work, but actually doesn't
    ) {
        if (x === void 0) { x = fn(y, function (y, x) { return y.x = x; }); }
        this.x = x;
    }
    return C;
}());
