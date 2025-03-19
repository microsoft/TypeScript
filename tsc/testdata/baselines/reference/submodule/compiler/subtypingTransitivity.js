//// [tests/cases/compiler/subtypingTransitivity.ts] ////

//// [subtypingTransitivity.ts]
class B {
    x: Object;
}

class D extends B {
    public x: string;
}
class D2 extends B {
    public x: number;
}

var b: B;
var d: D;
var d2: D2;

d.x = '';
b = d;
b.x = 1; // assigned number to string


//// [subtypingTransitivity.js]
class B {
    x;
}
class D extends B {
    x;
}
class D2 extends B {
    x;
}
var b;
var d;
var d2;
d.x = '';
b = d;
b.x = 1; // assigned number to string
