//// [tests/cases/conformance/expressions/functions/arrowFunctionContexts.ts] ////

//// [arrowFunctionContexts.ts]
// Arrow function used in with statement
with (window) {
    var p = () => this;
}

// Arrow function as argument to super call
class Base {
    constructor(n: any) { }
}

class Derived extends Base {
    constructor() {
        super(() => this);
    }
}

// Arrow function as function argument
window.setTimeout(() => null, 100);

// Arrow function as value in array literal

var obj = (n: number): string => '';
var obj: { (n: number): string; }; // OK

var arr: ((n: number) => string)[] = [(n: number) => ''];
var arr: { (n: number): string; }[]; // Incorrect error here (bug 829597)

// Arrow function as enum value
enum E {
    x = () => 4, // Error expected
    y = (() => this).length // error, can't use this in enum
}

// Arrow function as module variable initializer
module M {
    export var a = (s: any): string => '';
    var b = (s) => s;
}

// Repeat above for module members that are functions? (necessary to redo all of them?)
module M2 {
    // Arrow function used in with statement
    with (window) {
        var p = () => this;
    }

    // Arrow function as argument to super call
    class Base {
        constructor(n: any) { }
    }

    class Derived extends Base {
        constructor() {
            super(() => this);
        }
    }

    // Arrow function as function argument
    window.setTimeout(() => null, 100);

    // Arrow function as value in array literal

    var obj = (n: number) => '';
    var obj: { (n: number): string; }; // OK

    var arr = [(n: number) => ''];
    var arr: { (n: number): string; }[]; // Incorrect error here (bug 829597)

    // Arrow function as enum value
    enum E {
        x = () => 4, // Error expected
        y = (() => this).length
    }

    // Arrow function as module variable initializer
    module M {
        export var a = (s) => '';
        var b = (s) => s;
    }

}

// <Identifier>(ParamList) => { ... } is a generic arrow function
var generic1 = <T>(n: T): T[] => [n];
var generic1: { <T>(n: T): T[] }; // Incorrect error, Bug 829597
var generic2 = <T>(n: T): T[] => { return [n]; };
var generic2: { <T>(n: T): T[] };

// <Identifier> ((ParamList) => { ... } ) is a type assertion to an arrow function
var asserted1 = <any>((n) => [n]);
var asserted1: any;
var asserted2 = <any>((n) => { return n; });
var asserted2: any;



/// [Declarations] ////



//// [arrowFunctionContexts.d.ts]
declare class Base {
    constructor(n: any);
}
declare class Derived extends Base {
    constructor();
}
declare var obj: (n: number) => string;
declare var obj: {
    (n: number): string;
};
declare var arr: ((n: number) => string)[];
declare var arr: {
    (n: number): string;
}[];
declare enum E {
    x,// Error expected
    y
}
declare namespace M {
    var a: (s: any) => string;
}
declare namespace M2 {
}
declare var generic1: <T>(n: T) => T[];
declare var generic1: {
    <T>(n: T): T[];
};
declare var generic2: <T>(n: T) => T[];
declare var generic2: {
    <T>(n: T): T[];
};
declare var asserted1: any;
declare var asserted1: any;
declare var asserted2: any;
declare var asserted2: any;
/// [Errors] ////

arrowFunctionContexts.ts(2,1): error TS2410: The 'with' statement is not supported. All symbols in a 'with' block will have type 'any'.
arrowFunctionContexts.ts(30,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
arrowFunctionContexts.ts(30,9): error TS18033: Type '() => number' is not assignable to type 'number' as required for computed enum member values.
arrowFunctionContexts.ts(31,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
arrowFunctionContexts.ts(31,16): error TS2332: 'this' cannot be referenced in current location.
arrowFunctionContexts.ts(43,5): error TS2410: The 'with' statement is not supported. All symbols in a 'with' block will have type 'any'.
arrowFunctionContexts.ts(71,13): error TS18033: Type '() => number' is not assignable to type 'number' as required for computed enum member values.
arrowFunctionContexts.ts(72,20): error TS2332: 'this' cannot be referenced in current location.


==== arrowFunctionContexts.ts (8 errors) ====
    // Arrow function used in with statement
    with (window) {
    ~~~~~~~~~~~~~
!!! error TS2410: The 'with' statement is not supported. All symbols in a 'with' block will have type 'any'.
        var p = () => this;
    }
    
    // Arrow function as argument to super call
    class Base {
        constructor(n: any) { }
    }
    
    class Derived extends Base {
        constructor() {
            super(() => this);
        }
    }
    
    // Arrow function as function argument
    window.setTimeout(() => null, 100);
    
    // Arrow function as value in array literal
    
    var obj = (n: number): string => '';
    var obj: { (n: number): string; }; // OK
    
    var arr: ((n: number) => string)[] = [(n: number) => ''];
    var arr: { (n: number): string; }[]; // Incorrect error here (bug 829597)
    
    // Arrow function as enum value
    enum E {
        x = () => 4, // Error expected
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
            ~~~~~~~
!!! error TS18033: Type '() => number' is not assignable to type 'number' as required for computed enum member values.
        y = (() => this).length // error, can't use this in enum
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                   ~~~~
!!! error TS2332: 'this' cannot be referenced in current location.
    }
    
    // Arrow function as module variable initializer
    module M {
        export var a = (s: any): string => '';
        var b = (s) => s;
    }
    
    // Repeat above for module members that are functions? (necessary to redo all of them?)
    module M2 {
        // Arrow function used in with statement
        with (window) {
        ~~~~~~~~~~~~~
!!! error TS2410: The 'with' statement is not supported. All symbols in a 'with' block will have type 'any'.
            var p = () => this;
        }
    
        // Arrow function as argument to super call
        class Base {
            constructor(n: any) { }
        }
    
        class Derived extends Base {
            constructor() {
                super(() => this);
            }
        }
    
        // Arrow function as function argument
        window.setTimeout(() => null, 100);
    
        // Arrow function as value in array literal
    
        var obj = (n: number) => '';
        var obj: { (n: number): string; }; // OK
    
        var arr = [(n: number) => ''];
        var arr: { (n: number): string; }[]; // Incorrect error here (bug 829597)
    
        // Arrow function as enum value
        enum E {
            x = () => 4, // Error expected
                ~~~~~~~
!!! error TS18033: Type '() => number' is not assignable to type 'number' as required for computed enum member values.
            y = (() => this).length
                       ~~~~
!!! error TS2332: 'this' cannot be referenced in current location.
        }
    
        // Arrow function as module variable initializer
        module M {
            export var a = (s) => '';
            var b = (s) => s;
        }
    
    }
    
    // <Identifier>(ParamList) => { ... } is a generic arrow function
    var generic1 = <T>(n: T): T[] => [n];
    var generic1: { <T>(n: T): T[] }; // Incorrect error, Bug 829597
    var generic2 = <T>(n: T): T[] => { return [n]; };
    var generic2: { <T>(n: T): T[] };
    
    // <Identifier> ((ParamList) => { ... } ) is a type assertion to an arrow function
    var asserted1 = <any>((n) => [n]);
    var asserted1: any;
    var asserted2 = <any>((n) => { return n; });
    var asserted2: any;
    
    