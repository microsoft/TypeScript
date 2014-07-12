//// [typeOfThisInStaticMembers2.js]
var C = (function () {
    function C() {
    }
    C.foo = this;
    return C;
})();

var C2 = (function () {
    function C2() {
    }
    C2.foo = this;
    return C2;
})();
