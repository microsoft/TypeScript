// these operators require their operands to be of type Any, the Number primitive type, or
// an enum type
enum E { a, b, c }

var a: any;
var b: boolean;
var c: number;
var d: string;
var e: { a: number };
var f: Number;

// All of the below should be an error unless otherwise noted
// operator **
var r1a1 = a ** a; //ok
var r1a2 = a ** b;
var r1a3 = a ** c; //ok
var r1a4 = a ** d;
var r1a5 = a ** e;
var r1a6 = a ** f;

var r1b1 = b ** a;
var r1b2 = b ** b;
var r1b3 = b ** c;
var r1b4 = b ** d;
var r1b5 = b ** e;
var r1b6 = b ** f;

var r1c1 = c ** a; //ok
var r1c2 = c ** b;
var r1c3 = c ** c; //ok
var r1c4 = c ** d;
var r1c5 = c ** e;
var r1c6 = c ** f;

var r1d1 = d ** a;
var r1d2 = d ** b;
var r1d3 = d ** c;
var r1d4 = d ** d;
var r1d5 = d ** e;
var r1d6 = d ** f;

var r1e1 = e ** a;
var r1e2 = e ** b;
var r1e3 = e ** c;
var r1e4 = e ** d;
var r1e5 = e ** e;
var r1e6 = e ** f;

var r1f1 = f ** a;
var r1f2 = f ** b;
var r1f3 = f ** c;
var r1f4 = f ** d;
var r1f5 = f ** e;
var r1f6 = f ** f;

var r1g1 = E.a ** a; //ok
var r1g2 = E.a ** b;
var r1g3 = E.a ** c; //ok
var r1g4 = E.a ** d;
var r1g5 = E.a ** e;
var r1g6 = E.a ** f;

var r1h1 = a ** E.b; //ok
var r1h2 = b ** E.b;
var r1h3 = c ** E.b; //ok
var r1h4 = d ** E.b;
var r1h5 = e ** E.b;
var r1h6 = f ** E.b