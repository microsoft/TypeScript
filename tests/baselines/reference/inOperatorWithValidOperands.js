//// [tests/cases/conformance/expressions/binaryOperators/inOperator/inOperatorWithValidOperands.ts] ////

//// [inOperatorWithValidOperands.ts]
var x: any;

// valid left operands
// the left operand is required to be of type Any, the String primitive type, or the Number primitive type
declare var a1: string;
declare var a2: number;
declare var a3: string | number | symbol;
declare var a4: any;

var ra1 = x in x;
var ra2 = a1 in x;
var ra3 = a2 in x;
var ra4 = '' in x;
var ra5 = 0 in x;
var ra6 = a3 in x;
var ra7 = a4 in x;

// valid right operands
// the right operand is required to be of type Any, an object type, or a type parameter type
declare var b1: {};

var rb1 = x in b1;
var rb2 = x in {};

function foo<T>(t: T) {
    var rb3 = x in t;
}

function unionCase<T, U>(t: T | U) {
    var rb4 = x in t;
}

function unionCase2<T>(t: T | object) {
    var rb5 = x in t;
}

interface X { x: number }
interface Y { y: number }

declare var c1: X | Y;
declare var c2: X;
declare var c3: Y;

var rc1 = x in c1;
var rc2 = x in (c2 || c3);


//// [inOperatorWithValidOperands.js]
var x;
var ra1 = x in x;
var ra2 = a1 in x;
var ra3 = a2 in x;
var ra4 = '' in x;
var ra5 = 0 in x;
var ra6 = a3 in x;
var ra7 = a4 in x;
var rb1 = x in b1;
var rb2 = x in {};
function foo(t) {
    var rb3 = x in t;
}
function unionCase(t) {
    var rb4 = x in t;
}
function unionCase2(t) {
    var rb5 = x in t;
}
var rc1 = x in c1;
var rc2 = x in (c2 || c3);
