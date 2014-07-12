//// [chainedAssignmentChecking.js]
var X = (function () {
    function X(z) {
        this.z = z;
    }
    return X;
})();

var Y = (function () {
    function Y(z) {
        this.z = z;
    }
    return Y;
})();

var Z = (function () {
    function Z() {
    }
    return Z;
})();

var c1 = new X(3);
var c2 = new Y(5);
var c3 = new Z();

c1 = c2 = c3; // Should be error
