//// [tests/cases/conformance/ambient/ambientErrors.ts] ////

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
declare function fn3(x: number = 3): any;

// Ambient function with function body
declare function fn4(): void { };

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
    function fn(): void { }
    class C {
        static x = 3;
        y = 4;
        constructor() { }
        fn(): void { }
        static sfn(): void { }
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
    var n: any;
    export var q: any;
    export = n;
}


/// [Declarations] ////



//// [/.src/ambientErrors.d.ts]
declare var x: number;
declare function fn(x: number): string;
declare function fn(x: 'foo'): number;
declare function fn1(x: number): string;
declare function fn1(x: number): string;
declare function fn2(x: number): string;
declare function fn2(x: number): number;
declare function fn3(x?: number): any;
declare function fn4(): void;
declare enum E1 {
    y = 4.23
}
declare enum E2 {
    x
}
declare namespace M1 {
    var x: number;
    function fn(): void;
    class C {
        static x: number;
        y: number;
        constructor();
        fn(): void;
        static sfn(): void;
    }
}
declare namespace M2 {
}
declare module '../foo' { }
declare module 'bar' {
    var n: any;
    export var q: any;
    export = n;
}
/// [Errors] ////

ambientErrors.ts(2,17): error TS1039: Initializers are not allowed in ambient contexts.
ambientErrors.ts(17,22): error TS2371: A parameter initializer is only allowed in a function or constructor implementation.
ambientErrors.ts(20,30): error TS1183: An implementation cannot be declared in ambient contexts.
ambientErrors.ts(29,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
ambientErrors.ts(29,9): error TS1066: In ambient enum declarations member initializer must be constant expression.
ambientErrors.ts(34,13): error TS1039: Initializers are not allowed in ambient contexts.
ambientErrors.ts(35,25): error TS1183: An implementation cannot be declared in ambient contexts.
ambientErrors.ts(37,20): error TS1039: Initializers are not allowed in ambient contexts.
ambientErrors.ts(38,13): error TS1039: Initializers are not allowed in ambient contexts.
ambientErrors.ts(39,23): error TS1183: An implementation cannot be declared in ambient contexts.
ambientErrors.ts(40,20): error TS1183: An implementation cannot be declared in ambient contexts.
ambientErrors.ts(41,28): error TS1183: An implementation cannot be declared in ambient contexts.
ambientErrors.ts(47,20): error TS2435: Ambient modules cannot be nested in other modules or namespaces.
ambientErrors.ts(51,16): error TS2436: Ambient module declaration cannot specify relative module name.
ambientErrors.ts(57,5): error TS2309: An export assignment cannot be used in a module with other exported elements.


==== ambientErrors.ts (15 errors) ====
    // Ambient variable with an initializer 
    declare var x = 4;
                    ~
!!! error TS1039: Initializers are not allowed in ambient contexts.
    
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
    declare function fn3(x: number = 3): any;
                         ~~~~~~~~~~~~~
!!! error TS2371: A parameter initializer is only allowed in a function or constructor implementation.
    
    // Ambient function with function body
    declare function fn4(): void { };
                                 ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
    
    // Ambient enum with non - integer literal constant member
    declare enum E1 {
        y = 4.23
    }
    
    // Ambient enum with computer member
    declare enum E2 {
        x = 'foo'.length
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~~~~~~~~
!!! error TS1066: In ambient enum declarations member initializer must be constant expression.
    }
    
    // Ambient module with initializers for values, bodies for functions / classes
    declare module M1 {
        var x = 3;
                ~
!!! error TS1039: Initializers are not allowed in ambient contexts.
        function fn(): void { }
                            ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        class C {
            static x = 3;
                       ~
!!! error TS1039: Initializers are not allowed in ambient contexts.
            y = 4;
                ~
!!! error TS1039: Initializers are not allowed in ambient contexts.
            constructor() { }
                          ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            fn(): void { }
                       ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
            static sfn(): void { }
                               ~
!!! error TS1183: An implementation cannot be declared in ambient contexts.
        }
    }
    
    // Ambient external module not in the global module
    module M2 {
        declare module 'nope' { }
                       ~~~~~~
!!! error TS2435: Ambient modules cannot be nested in other modules or namespaces.
    }
    
    // Ambient external module with a string literal name that isn't a top level external module name
    declare module '../foo' { }
                   ~~~~~~~~
!!! error TS2436: Ambient module declaration cannot specify relative module name.
    
    // Ambient external module with export assignment and other exported members
    declare module 'bar' {
        var n: any;
        export var q: any;
        export = n;
        ~~~~~~~~~~~
!!! error TS2309: An export assignment cannot be used in a module with other exported elements.
    }
    