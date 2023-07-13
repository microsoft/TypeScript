//// [tests/cases/conformance/ambient/ambientDeclarations.ts] ////

//// [ambientDeclarations.ts]
// Ambient variable without type annotation
declare var n;

// Ambient variable with type annotation
declare var m: string;

// Ambient function with no type annotations
declare function fn1();

// Ambient function with type annotations
declare function fn2(n: string): number;

// Ambient function with valid overloads
declare function fn3(n: string): number;
declare function fn4(n: number, y: number): string;

// Ambient function with optional parameters
declare function fn5(x, y?);
declare function fn6(e?);
declare function fn7(x, y?, ...z);
declare function fn8(y?, ...z: number[]);
declare function fn9(...q: {}[]);
declare function fn10<T>(...q: T[]);

// Ambient class
declare class cls {
    constructor();
    method(): cls;
    static static(p): number;
    static q;
    private fn();
    private static fns();
}

// Ambient enum
declare enum E1 {
    x,
    y,
    z
}

// Ambient enum with integer literal initializer
declare enum E2 {
    q,
    a = 1,
    b,
    c = 2,
    d
}

// Ambient enum members are always exported with or without export keyword
declare enum E3 {
    A
}
declare module E3 {
    var B;
}
var x = E3.B;

// Ambient module
declare module M1 {
    var x;
    function fn(): number;
}

// Ambient module members are always exported with or without export keyword
var p = M1.x;
var q = M1.fn();

// Ambient external module in the global module
// Ambient external module with a string literal name that is a top level external module name
declare module 'external1' {
    var q;
}



//// [ambientDeclarations.js]
var x = E3.B;
// Ambient module members are always exported with or without export keyword
var p = M1.x;
var q = M1.fn();
