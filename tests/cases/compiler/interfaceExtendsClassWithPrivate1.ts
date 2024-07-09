class C {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

class D extends C implements I {
    public foo(x: any) { return x; }
    other(x: any) { return x; }
    bar() { }
} 

var c: C;
var i: I;
var d: D;

c = i;
i = c; // error

i = d;
d = i; // error

c = d;
d = c; // error