//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorWithInvalidOperands.ts] ////

//// [exponentiationOperatorWithInvalidOperands.ts]
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

//// [exponentiationOperatorWithInvalidOperands.js]
// these operators require their operands to be of type Any, the Number primitive type, or
// an enum type
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
    E[E["c"] = 2] = "c";
})(E || (E = {}));
var a;
var b;
var c;
var d;
var e;
var f;
// All of the below should be an error unless otherwise noted
// operator **
var r1a1 = Math.pow(a, a); //ok
var r1a2 = Math.pow(a, b);
var r1a3 = Math.pow(a, c); //ok
var r1a4 = Math.pow(a, d);
var r1a5 = Math.pow(a, e);
var r1a6 = Math.pow(a, f);
var r1b1 = Math.pow(b, a);
var r1b2 = Math.pow(b, b);
var r1b3 = Math.pow(b, c);
var r1b4 = Math.pow(b, d);
var r1b5 = Math.pow(b, e);
var r1b6 = Math.pow(b, f);
var r1c1 = Math.pow(c, a); //ok
var r1c2 = Math.pow(c, b);
var r1c3 = Math.pow(c, c); //ok
var r1c4 = Math.pow(c, d);
var r1c5 = Math.pow(c, e);
var r1c6 = Math.pow(c, f);
var r1d1 = Math.pow(d, a);
var r1d2 = Math.pow(d, b);
var r1d3 = Math.pow(d, c);
var r1d4 = Math.pow(d, d);
var r1d5 = Math.pow(d, e);
var r1d6 = Math.pow(d, f);
var r1e1 = Math.pow(e, a);
var r1e2 = Math.pow(e, b);
var r1e3 = Math.pow(e, c);
var r1e4 = Math.pow(e, d);
var r1e5 = Math.pow(e, e);
var r1e6 = Math.pow(e, f);
var r1f1 = Math.pow(f, a);
var r1f2 = Math.pow(f, b);
var r1f3 = Math.pow(f, c);
var r1f4 = Math.pow(f, d);
var r1f5 = Math.pow(f, e);
var r1f6 = Math.pow(f, f);
var r1g1 = Math.pow(E.a, a); //ok
var r1g2 = Math.pow(E.a, b);
var r1g3 = Math.pow(E.a, c); //ok
var r1g4 = Math.pow(E.a, d);
var r1g5 = Math.pow(E.a, e);
var r1g6 = Math.pow(E.a, f);
var r1h1 = Math.pow(a, E.b); //ok
var r1h2 = Math.pow(b, E.b);
var r1h3 = Math.pow(c, E.b); //ok
var r1h4 = Math.pow(d, E.b);
var r1h5 = Math.pow(e, E.b);
var r1h6 = Math.pow(f, E.b);
