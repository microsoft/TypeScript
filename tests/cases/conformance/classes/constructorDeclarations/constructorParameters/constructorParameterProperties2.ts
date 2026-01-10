class C {
    y: number;
    constructor(y: number) { } // ok
}

declare var c: C;
var r = c.y;

class D {
    y: number;
    constructor(public y: number) { } // error
}

declare var d: D;
var r2 = d.y;

class E {
    y: number;
    constructor(private y: number) { } // error
}

declare var e: E;
var r3 = e.y; // error

class F {
    y: number;
    constructor(protected y: number) { } // error
}

declare var f: F;
var r4 = f.y; // error
