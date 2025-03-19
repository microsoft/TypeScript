//// [tests/cases/conformance/types/typeRelationships/bestCommonType/bestCommonTypeOfTuple2.ts] ////

//// [bestCommonTypeOfTuple2.ts]
interface base { }
interface base1 { i }
class C implements base { c }
class D implements base { d }
class E implements base { e }
class F extends C { f }

class C1 implements base1 { i = "foo"; c }
class D1 extends C1 { i = "bar"; d }

var t1: [C, base];
var t2: [C, D];
var t3: [C1, D1];
var t4: [base1, C1];
var t5: [C1, F]

var e11 = t1[4]; // base
var e21 = t2[4]; // {}
var e31 = t3[4]; // C1
var e41 = t4[2]; // base1
var e51 = t5[2]; // {}


//// [bestCommonTypeOfTuple2.js]
class C {
    c;
}
class D {
    d;
}
class E {
    e;
}
class F extends C {
    f;
}
class C1 {
    i = "foo";
    c;
}
class D1 extends C1 {
    i = "bar";
    d;
}
var t1;
var t2;
var t3;
var t4;
var t5;
var e11 = t1[4]; // base
var e21 = t2[4]; // {}
var e31 = t3[4]; // C1
var e41 = t4[2]; // base1
var e51 = t5[2]; // {}
