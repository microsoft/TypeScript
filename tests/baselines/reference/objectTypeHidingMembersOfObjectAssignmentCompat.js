//// [objectTypeHidingMembersOfObjectAssignmentCompat.js]
var i;
var o;
o = i; // error
i = o; // ok

var C = (function () {
    function C() {
    }
    C.prototype.toString = function () {
    };
    return C;
})();
var c;
o = c; // error
c = o; // ok

var a = {
    toString: function () {
    }
};
o = a; // error
a = o; // ok
