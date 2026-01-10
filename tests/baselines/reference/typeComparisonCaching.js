//// [tests/cases/compiler/typeComparisonCaching.ts] ////

//// [typeComparisonCaching.ts]
// Check that we only cache results of type comparisons that are free of assumptions

interface A {
    p: C;
    s: string;
}

interface B {
    p: D;
    s: number;
}

interface C {
    q: A;
}

interface D {
    q: B;
}

var a: A;
declare var b: B;
var c: C;
declare var d: D;

a = b;
c = d; // Should not be allowed


//// [typeComparisonCaching.js]
// Check that we only cache results of type comparisons that are free of assumptions
var a;
var c;
a = b;
c = d; // Should not be allowed
