// doc 3.1

struct C {
    y: number;
    constructor(y: number) { } // ok
}

var c: C;
var r = c.y;

struct D {
    y: number;
    constructor(public y: number) { } // error, Duplicate identifier 'y'
}

var d: D;
var r2 = d.y;

struct E {
    y: number;
    constructor(private y: number) { } // error, Duplicate identifier 'y'
}

var e: E;
var r3 = e.y; // error

