//// [privateInterfaceProperties.js]
// should be an error
var c1 = (function () {
    function c1() {
    }
    return c1;
})();

// should be ok
var c2 = (function () {
    function c2() {
    }
    return c2;
})();
