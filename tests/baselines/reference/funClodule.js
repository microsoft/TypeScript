//// [funClodule.js]
function foo3() {
}
var foo3;
(function (foo3) {
    function x() {
    }
    foo3.x = x;
})(foo3 || (foo3 = {}));
var foo3 = (function () {
    function foo3() {
    }
    return foo3;
})(); // Should error
