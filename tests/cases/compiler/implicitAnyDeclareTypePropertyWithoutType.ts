// @noimplicitany: true
class C {
    constructor() { }
}

// this should be an error
var x: { y; z; }             // error at "y,z"
var x1: { y1: C; z1; };      // error at "z1" 
var x11: { new (); };        // error at "new"
var x2: (y2) => number;      // error at "y2"
var x3: (x3: string, y3) => void ; // error at "y3"

// this should not be an error
var bar: { a: number; b: number };
var foo: { littleC: C; c: string };
var x4: new () => any;
var x5: () => any;
