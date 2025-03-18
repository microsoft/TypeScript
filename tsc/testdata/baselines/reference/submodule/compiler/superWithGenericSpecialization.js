//// [tests/cases/compiler/superWithGenericSpecialization.ts] ////

//// [superWithGenericSpecialization.ts]
class C<T> {
    x: T;
}

class D<T> extends C<string> {
    y: T;
    constructor() {
        super(); // uses the type parameter type of the base class, ie string
    }
}

var d: D<number>;
var r: string = d.x;
var r2: number = d.y;

//// [superWithGenericSpecialization.js]
class C {
    x;
}
class D extends C {
    y;
    constructor() {
        super();
    }
}
var d;
var r = d.x;
var r2 = d.y;
