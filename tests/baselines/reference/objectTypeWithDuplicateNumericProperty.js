//// [objectTypeWithDuplicateNumericProperty.js]
// numeric properties must be distinct after a ToNumber operation
// so the below are all errors
var C = (function () {
    function C() {
    }
    return C;
})();

var a;

var b = {
    1: 1,
    1.0: 1,
    1.: 1,
    1.00: 1
};
