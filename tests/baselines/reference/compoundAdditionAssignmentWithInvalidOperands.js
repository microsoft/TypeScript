//// [compoundAdditionAssignmentWithInvalidOperands.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));

var a;

var x1;
x1 += a;
x1 += true;
x1 += 0;
x1 += 0 /* a */;
x1 += {};
x1 += null;
x1 += undefined;

var x2;
x2 += a;
x2 += true;
x2 += 0;
x2 += 0 /* a */;
x2 += {};
x2 += null;
x2 += undefined;

var x3;
x3 += a;
x3 += true;
x3 += 0;
x3 += 0 /* a */;
x3 += {};
x3 += null;
x3 += undefined;

var x4;
x4 += a;
x4 += true;
x4 += {};

var x5;
x5 += a;
x5 += true;
x5 += {};
