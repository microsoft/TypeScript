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
var b: B;
var c: C;
var d: D;

a = b;
c = d; // Should not be allowed
