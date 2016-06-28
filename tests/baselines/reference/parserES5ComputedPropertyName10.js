//// [parserES5ComputedPropertyName10.ts]
class C {
   [e] = 1
}

//// [parserES5ComputedPropertyName10.js]
var C = (function () {
    function C() {
        this[e] = 1;
    }
    return C;
}());
