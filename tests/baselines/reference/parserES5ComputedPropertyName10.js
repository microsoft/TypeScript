//// [parserES5ComputedPropertyName10.ts]
class C {
   [e] = 1
}

//// [parserES5ComputedPropertyName10.js]
var _a;
var C = /** @class */ (function () {
    function C() {
        this[_a] = 1;
    }
    return C;
}());
_a = e;
