//// [genericAssignmentCompatWithInterfaces1.js]
var A = (function () {
    function A() {
    }
    A.prototype.compareTo = function (other) {
        return 1;
    };
    return A;
})();
var z = { x: new A() };
var a1 = { x: new A() };
var a2 = function () {
    var z = { x: new A() };
    return z;
}();
var a3 = z;
var a4 = z;
