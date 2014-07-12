//// [assignmentStricterConstraints.js]
var f = function (x, y) {
    x = y;
};

var g = function (x, y) {
};

g = f;
g(1, "");
