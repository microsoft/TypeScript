//// [foo1.js]
var x = { a: "test", b: 42 };
module.exports = x;
//// [foo2.js]
var C1 = (function () {
    function C1() {
    }
    return C1;
})();

module.exports = C1;
//// [foo3.js]
var C1 = (function () {
    function C1() {
    }
    return C1;
})();

module.exports = C1;
