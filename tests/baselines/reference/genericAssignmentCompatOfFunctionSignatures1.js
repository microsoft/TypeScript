//// [genericAssignmentCompatOfFunctionSignatures1.js]
var x1 = function foo3(x, z) {
};
var x2 = function foo3(x, z) {
};

x1 = x2;
x2 = x1;
