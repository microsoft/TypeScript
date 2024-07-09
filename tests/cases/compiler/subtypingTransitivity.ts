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
