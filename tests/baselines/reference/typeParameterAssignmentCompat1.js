//// [typeParameterAssignmentCompat1.js]
function f() {
    var x;
    var y;
    x = y; // should be an error
    return x;
}

var C = (function () {
    function C() {
    }
    C.prototype.f = function () {
        var x;
        var y;
        x = y; // should be an error
        return x;
    };
    return C;
})();
