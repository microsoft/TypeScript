// No errors expected for basic overloads of construct signatures with merged declarations

// clodules
class C {
    constructor(x: number, y?: string);
    constructor(x: number, y: string);
    constructor(x: number) { }
}
module C {
    export var x = 1;
}

var r1 = new C(1, '');

class C2<T> {
    constructor(x: T, y?: string);
    constructor(x: T, y: string);
    constructor(x: T) { }
}
module C2 {
    export var x = 1;
}

var r2 = new C2(1, '');

// merged interfaces
interface I {
    new (x: number, y?: string): C;
    new (x: number, y: string): C;
}

interface I<T> {
    new (x: T, y?: number): C2<T>;
    new (x: T, y: number): C2<T>;
}

var i2: I<number>;
var r4 = new i2(1, '');
var r5 = new i2(1, 1);