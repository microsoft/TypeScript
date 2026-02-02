//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorParameterProperties2.ts] ////

//// [constructorParameterProperties2.ts]
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


//// [constructorParameterProperties2.js]
class C {
    constructor(y) { } // ok
}
var r = c.y;
class D {
    constructor(y) {
        this.y = y;
    } // error
}
var r2 = d.y;
class E {
    constructor(y) {
        this.y = y;
    } // error
}
var r3 = e.y; // error
class F {
    constructor(y) {
        this.y = y;
    } // error
}
var r4 = f.y; // error
