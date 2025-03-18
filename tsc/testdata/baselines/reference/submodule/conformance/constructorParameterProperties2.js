//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorParameterProperties2.ts] ////

//// [constructorParameterProperties2.ts]
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

class F {
    y: number;
    constructor(protected y: number) { } // error
}

var f: F;
var r4 = f.y; // error


//// [constructorParameterProperties2.js]
class C {
    y;
    constructor(y) { }
}
var c;
var r = c.y;
class D {
    y;
    y;
    constructor(y) {
        this.y = y;
    }
}
var d;
var r2 = d.y;
class E {
    y;
    y;
    constructor(y) {
        this.y = y;
    }
}
var e;
var r3 = e.y;
class F {
    y;
    y;
    constructor(y) {
        this.y = y;
    }
}
var f;
var r4 = f.y;
