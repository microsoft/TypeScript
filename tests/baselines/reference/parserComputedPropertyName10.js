//// [parserComputedPropertyName10.ts]
class C {
   [e] = 1
}

//// [parserComputedPropertyName10.js]
var C = (function () {
    function C() {
        this[e] = 1;
    }
    return C;
})();
