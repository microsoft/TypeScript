//// [interfaceInheritance.js]
var C1 = (function () {
    function C1() {
    }
    return C1;
})();

var i2;
var i1;
var i3;
i1 = i2;
i2 = i3; // should be an error - i3 does not implement the members of i1

var c1;

var i4;
var i5;

i4 = i5; // should be an error
i5 = i4; // should be an error
