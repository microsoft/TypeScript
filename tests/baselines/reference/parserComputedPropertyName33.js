//// [parserComputedPropertyName33.ts]
class C {
    // No ASI
    [e] = 0
    [e2]() { }
}

//// [parserComputedPropertyName33.js]
var C = (function () {
    function C() {
        // No ASI
        this[e] = 0[e2]();
    }
    return C;
})();
{ }
