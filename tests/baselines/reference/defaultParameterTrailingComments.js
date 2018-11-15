//// [defaultParameterTrailingComments.ts]
class C {
    constructor(defaultParam: boolean = false /* Emit only once*/) {}
}

function foo(defaultParam = 10 /*emit only once*/) {}

//// [defaultParameterTrailingComments.js]
var C = /** @class */ (function () {
    function C(defaultParam /* Emit only once*/) {
        if (defaultParam === void 0) { defaultParam = false; }
    }
    return C;
}());
function foo(defaultParam /*emit only once*/) {
    if (defaultParam === void 0) { defaultParam = 10; }
}
