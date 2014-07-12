//// [objectTypeHidingMembersOfObjectAssignmentCompat2.js]
var i;
var o;
o = i; // error
i = o; // error

var C = (function () {
    function C() {
    }
    C.prototype.toString = function () {
        return 1;
    };
    return C;
})();
var c;
o = c; // error
c = o; // error

var a = {
    toString: function () {
    }
};
o = a; // error
a = o; // ok
