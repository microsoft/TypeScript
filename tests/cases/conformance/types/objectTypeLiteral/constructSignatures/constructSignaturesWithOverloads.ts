// No errors expected for basic overloads of construct signatures

class C {
    constructor(x: number, y?: string);
    constructor(x: number, y: string);
    constructor(x: number) { }
}

var r1 = new C(1, '');

class C2<T> {
    constructor(x: T, y?: string);
    constructor(x: T, y: string);
    constructor(x: T) { }
}

var r2 = new C2(1, '');

interface I {
    new(x: number, y?: string): C;
    new(x: number, y: string): C;
}

var i: I;
var r3 = new i(1, '');

interface I2<T> {
    new (x: T, y?: string): C2<T>;
    new (x: T, y: string): C2<T>;
    new <T>(x: T, y?: string): C2<T>;
    new <T>(x: T, y: string): C2<T>;

}

var i2: I2<number>;
var r4 = new i2(1, '');

var a: {
    new(x: number, y?: string): C;
    new(x: number, y: string): C;
}

var r5 = new a(1, '');

var b: {
    new<T>(x: T, y?: string): C2<T>;
    new<T>(x: T, y: string): C2<T>;
}

var r6 = new b(1, '');