//// [duplicateStringIndexers.js]
// it is an error to have duplicate index signatures of the same kind in a type

var C = (function () {
    function C() {
    }
    return C;
})();

var a;
