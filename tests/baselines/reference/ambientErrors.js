//// [ambientErrors.ts]
// Ambient variable with an initializer 
declare var x = 4;

// Ambient functions with invalid overloads
declare function fn(x: number): string;
declare function fn(x: 'foo'): number;

// Ambient functions with duplicate signatures
declare function fn1(x: number): string;
declare function fn1(x: number): string;

// Ambient function overloads that differ only by return type
declare function fn2(x: number): string;
declare function fn2(x: number): number;

// Ambient function with default parameter values
declare function fn3(x = 3);

// Ambient function with function body
declare function fn4() { };

// Ambient enum with non - integer literal constant member
declare enum E1 {
    y = 4.23
}

// Ambient enum with computer member
declare enum E2 {
    x = 'foo'.length
}

// Ambient module with initializers for values, bodies for functions / classes
declare module M1 {
    var x = 3;
    function fn() { }
    class C {
        static x = 3;
        y = 4;
        constructor() { }
        fn() { }
        static sfn() { }
    }
}

// Ambient external module not in the global module
module M2 {
    declare module 'nope' { }
}

// Ambient external module with a string literal name that isn't a top level external module name
declare module '../foo' { }

// Ambient external module with export assignment and other exported members
declare module 'bar' {
    var n;
    export var q;
    export = n;
}


//// [ambientErrors.js]
;
