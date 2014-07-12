//// [functionTypeArgumentAssignmentCompat.js]
var f;

var g = function () {
    return [];
};

f = g;
var s = f("str").toUpperCase();

console.log(s);
