// call signatures in derived types must have the same or fewer optional parameters as the base type

interface Base { 
    a: new () => number;
    a2: new (x?: number) => number;
    a3: new (x: number) => number;
    a4: new (x: number, y?: number) => number;
    a5: new (x?: number, y?: number) => number;
    a6: new (x: number, y: number) => number;
}
var b: Base;

var a: new () => number;
    a = b.a; // ok
    a = b.a2; // ok
    a = b.a3; // error
    a = b.a4; // error
    a = b.a5; // ok
    a = b.a6; // error

var a2: new (x?: number) => number; 
    a2 = b.a; // ok
    a2 = b.a2; // ok
    a2 = b.a3; // ok
    a2 = b.a4; // ok
    a2 = b.a5; // ok
    a2 = b.a6; // error

var a3: new (x: number) => number; 
    a3 = b.a; // ok
    a3 = b.a2; // ok
    a3 = b.a3; // ok
    a3 = b.a4; // ok
    a3 = b.a5; // ok
    a3 = b.a6; // error

var a4: new (x: number, y?: number) => number;
    a4 = b.a; // ok
    a4 = b.a2; // ok
    a4 = b.a3; // ok
    a4 = b.a4; // ok
    a4 = b.a5; // ok
    a4 = b.a6; // ok

var a5: new (x?: number, y?: number) => number;
    a5 = b.a; // ok
    a5 = b.a2; // ok
    a5 = b.a3; // ok
    a5 = b.a4; // ok
    a5 = b.a5; // ok
    a5 = b.a6; // ok
