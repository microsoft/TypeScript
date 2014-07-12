class C {
    y: string;
    constructor(private x: string) { }
}

var c: C;
var r = c.y;
var r2 = c.x; // error

class D<T> {
    y: T;
    constructor(a: T, private x: T) { }
}

var d: D<string>;
var r = d.y;
var r2 = d.x; // error
var r3 = d.a; // error