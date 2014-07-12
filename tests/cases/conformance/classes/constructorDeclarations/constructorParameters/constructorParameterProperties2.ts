class C {
    y: number;
    constructor(y: number) { } // ok
}

var c: C;
var r = c.y;

class D {
    y: number;
    constructor(public y: number) { } // error
}

var d: D;
var r2 = d.y;

class E {
    y: number;
    constructor(private y: number) { } // error
}

var e: E;
var r3 = e.y; // error