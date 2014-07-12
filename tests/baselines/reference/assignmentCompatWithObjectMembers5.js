//// [assignmentCompatWithObjectMembers5.js]
var C = (function () {
    function C() {
    }
    return C;
})();

var c;

var i;

c = i; // error
i = c; // error
