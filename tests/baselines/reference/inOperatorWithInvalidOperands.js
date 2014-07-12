//// [inOperatorWithInvalidOperands.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
})(E || (E = {}));

var x;

// invalid left operands
// the left operand is required to be of type Any, the String primitive type, or the Number primitive type
var a1;
var a2;
var a3;
var a4;

var ra1 = a1 in x;
var ra2 = a2 in x;
var ra3 = a3 in x;
var ra4 = a4 in x;
var ra5 = null in x;
var ra6 = undefined in x;
var ra7 = 0 /* a */ in x;
var ra8 = false in x;
var ra9 = {} in x;

// invalid right operands
// the right operand is required to be of type Any, an object type, or a type parameter type
var b1;
var b2;
var b3;
var b4;

var rb1 = x in b1;
var rb2 = x in b2;
var rb3 = x in b3;
var rb4 = x in b4;
var rb5 = x in 0;
var rb6 = x in false;
var rb7 = x in '';
var rb8 = x in null;
var rb9 = x in undefined;

// both operands are invalid
var rc1 = {} in '';
