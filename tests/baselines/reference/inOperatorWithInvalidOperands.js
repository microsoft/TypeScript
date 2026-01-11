//// [tests/cases/conformance/expressions/binaryOperators/inOperator/inOperatorWithInvalidOperands.ts] ////

//// [inOperatorWithInvalidOperands.ts]
class Foo {}
enum E { a }

var x: any;

// invalid left operands
// the left operand is required to be of type Any, the String primitive type, or the Number primitive type
declare var a1: boolean;
declare var a2: void;
declare var a3: {};
declare var a4: E;
declare var a5: Foo | string;
declare var a6: Foo;

var ra1 = a1 in x;
var ra2 = a2 in x;
var ra3 = a3 in x;
var ra4 = a4 in x;
var ra5 = null in x;
var ra6 = undefined in x;
var ra7 = E.a in x;
var ra8 = false in x;
var ra9 = {} in x;
var ra10 = a5 in x;
var ra11 = a6 in x;

// invalid right operands
// the right operand is required to be of type Any, an object type, or a type parameter type
declare var b1: number;
declare var b2: boolean;
declare var b3: string;
declare var b4: void;
declare var b5: string | number;

var rb1 = x in b1;
var rb2 = x in b2;
var rb3 = x in b3;
var rb4 = x in b4;
var rb5 = x in b5;
var rb6 = x in 0;
var rb7 = x in false;
var rb8 = x in '';
var rb9 = x in null;
var rb10 = x in undefined;

// both operands are invalid
var rc1 = {} in '';

//// [inOperatorWithInvalidOperands.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var E;
(function (E) {
    E[E["a"] = 0] = "a";
})(E || (E = {}));
var x;
var ra1 = a1 in x;
var ra2 = a2 in x;
var ra3 = a3 in x;
var ra4 = a4 in x;
var ra5 = null in x;
var ra6 = undefined in x;
var ra7 = E.a in x;
var ra8 = false in x;
var ra9 = {} in x;
var ra10 = a5 in x;
var ra11 = a6 in x;
var rb1 = x in b1;
var rb2 = x in b2;
var rb3 = x in b3;
var rb4 = x in b4;
var rb5 = x in b5;
var rb6 = x in 0;
var rb7 = x in false;
var rb8 = x in '';
var rb9 = x in null;
var rb10 = x in undefined;
// both operands are invalid
var rc1 = {} in '';
