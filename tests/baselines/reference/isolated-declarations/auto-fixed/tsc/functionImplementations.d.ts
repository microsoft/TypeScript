//// [tests/cases/conformance/functions/functionImplementations.ts] ////

//// [functionImplementations.ts]
// FunctionExpression with no return type annotation and no return statement returns void
var v: void = function () { } ();

// FunctionExpression f with no return type annotation and directly references f in its body returns any
var a: any = function f() {
    return f;
};
var a: any = function f() {
    return f();
};

// FunctionExpression f with no return type annotation and indirectly references f in its body returns any
var a: any = function f() {
    var x = f;
    return x;
};

// Two mutually recursive function implementations with no return type annotations
function rec1(): any {
    return rec2();
}
function rec2(): any {
    return rec1();
}
var a: any = rec1();
var a: any = rec2();

// Two mutually recursive function implementations with return type annotation in one
function rec3(): number {
    return rec4();
}
function rec4(): number {
    return rec3();
}
var n: number;
var n: number = rec3();
var n: number = rec4();

// FunctionExpression with no return type annotation and returns a number
var n = function (): number {
    return 3;
} ();

// FunctionExpression with no return type annotation and returns null
var nu = null;
var nu = function (): any {
    return null;
} ();

// FunctionExpression with no return type annotation and returns undefined
var un = undefined;
var un = function (): any {
    return undefined;
} ();

// FunctionExpression with no return type annotation and returns a type parameter type
var n = function <T>(x: T): T {
    return x;
} (4);

// FunctionExpression with no return type annotation and returns a constrained type parameter type
var n = function <T extends {}>(x: T): T {
    return x;
} (4);

// FunctionExpression with no return type annotation with multiple return statements with identical types
var n = function (): 3 | 5 {
    return 3;
    return 5;
}();

// Otherwise, the inferred return type is the first of the types of the return statement expressions
// in the function body that is a supertype of each of the others, 
// ignoring return statements with no expressions.
// A compile - time error occurs if no return statement expression has a type that is a supertype of each of the others.
// FunctionExpression with no return type annotation with multiple return statements with subtype relation between returns
class Base { private m; }
class Derived extends Base { private q; }
var b: Base;
var b = function (): Base {
    return new Base(); return new Derived();
} ();

// FunctionExpression with no return type annotation with multiple return statements with one a recursive call
var a = function f(): Base {
    return new Base(); return new Derived(); return f(); // ?
} ();

// FunctionExpression with non -void return type annotation with a single throw statement
undefined === function (): number {
    throw undefined;
};

// Type of 'this' in function implementation is 'any'
function thisFunc(): void {
    var x = this;
    var x: any;
}

// Function signature with optional parameter, no type annotation and initializer has initializer's type
function opt1(n: number = 4): void {
    var m = n;
    var m: number;
}

// Function signature with optional parameter, no type annotation and initializer has initializer's widened type
function opt2(n: {
    x: any;
    y: any;
} = { x: null, y: undefined }): void {
    var m = n;
    var m: { x: any; y: any };
}

// Function signature with initializer referencing other parameter to the left
function opt3(n: number, m: number = n): void {
    var y = m;
    var y: number;
}

// Function signature with optional parameter has correct codegen 
// (tested above)

// FunctionExpression with non -void return type annotation return with no expression
function f6(): number {
    return;
}

class Derived2 extends Base { private r: string; }
class AnotherClass { private x }
// if f is a contextually typed function expression, the inferred return type is the union type
// of the types of the return statement expressions in the function body, 
// ignoring return statements with no expressions.
var f7: (x: number) => string | number = x => { // should be (x: number) => number | string
    if (x < 0) { return x; }
    return x.toString();
}
var f8: (x: number) => any = x => { // should be (x: number) => Base
    return new Base();
    return new Derived2();
}
var f9: (x: number) => any = x => { // should be (x: number) => Base
    return new Base();
    return new Derived();
    return new Derived2();
}
var f10: (x: number) => any = x => { // should be (x: number) => Derived | Derived1
    return new Derived();
    return new Derived2();
}
var f11: (x: number) => any = x => { // should be (x: number) => Base | AnotherClass
    return new Base();
    return new AnotherClass();
}
var f12: (x: number) => any = x => { // should be (x: number) => Base | AnotherClass
    return new Base();
    return; // should be ignored
    return new AnotherClass();
}

/// [Declarations] ////



//// [functionImplementations.d.ts]
declare var v: void;
declare var a: any;
declare var a: any;
declare var a: any;
declare function rec1(): any;
declare function rec2(): any;
declare var a: any;
declare var a: any;
declare function rec3(): number;
declare function rec4(): number;
declare var n: number;
declare var n: number;
declare var n: number;
declare var n: number;
declare var nu: any;
declare var nu: any;
declare var un: any;
declare var un: any;
declare var n: number;
declare var n: number;
declare var n: number;
declare class Base {
    private m;
}
declare class Derived extends Base {
    private q;
}
declare var b: Base;
declare var b: Base;
declare var a: any;
declare function thisFunc(): void;
declare function opt1(n?: number): void;
declare function opt2(n?: {
    x: any;
    y: any;
}): void;
declare function opt3(n: number, m?: number): void;
declare function f6(): number;
declare class Derived2 extends Base {
    private r;
}
declare class AnotherClass {
    private x;
}
declare var f7: (x: number) => string | number;
declare var f8: (x: number) => any;
declare var f9: (x: number) => any;
declare var f10: (x: number) => any;
declare var f11: (x: number) => any;
declare var f12: (x: number) => any;
/// [Errors] ////

functionImplementations.ts(67,5): error TS2403: Subsequent variable declarations must have the same type.  Variable 'n' must be of type 'number', but here has type '3 | 5'.
functionImplementations.ts(85,5): error TS2403: Subsequent variable declarations must have the same type.  Variable 'a' must be of type 'any', but here has type 'Base'.
functionImplementations.ts(90,1): error TS2839: This condition will always return 'false' since JavaScript compares objects by reference, not value.


==== functionImplementations.ts (3 errors) ====
    // FunctionExpression with no return type annotation and no return statement returns void
    var v: void = function () { } ();
    
    // FunctionExpression f with no return type annotation and directly references f in its body returns any
    var a: any = function f() {
        return f;
    };
    var a: any = function f() {
        return f();
    };
    
    // FunctionExpression f with no return type annotation and indirectly references f in its body returns any
    var a: any = function f() {
        var x = f;
        return x;
    };
    
    // Two mutually recursive function implementations with no return type annotations
    function rec1(): any {
        return rec2();
    }
    function rec2(): any {
        return rec1();
    }
    var a: any = rec1();
    var a: any = rec2();
    
    // Two mutually recursive function implementations with return type annotation in one
    function rec3(): number {
        return rec4();
    }
    function rec4(): number {
        return rec3();
    }
    var n: number;
    var n: number = rec3();
    var n: number = rec4();
    
    // FunctionExpression with no return type annotation and returns a number
    var n = function (): number {
        return 3;
    } ();
    
    // FunctionExpression with no return type annotation and returns null
    var nu = null;
    var nu = function (): any {
        return null;
    } ();
    
    // FunctionExpression with no return type annotation and returns undefined
    var un = undefined;
    var un = function (): any {
        return undefined;
    } ();
    
    // FunctionExpression with no return type annotation and returns a type parameter type
    var n = function <T>(x: T): T {
        return x;
    } (4);
    
    // FunctionExpression with no return type annotation and returns a constrained type parameter type
    var n = function <T extends {}>(x: T): T {
        return x;
    } (4);
    
    // FunctionExpression with no return type annotation with multiple return statements with identical types
    var n = function (): 3 | 5 {
        ~
!!! error TS2403: Subsequent variable declarations must have the same type.  Variable 'n' must be of type 'number', but here has type '3 | 5'.
!!! related TS6203 functionImplementations.ts:35:5: 'n' was also declared here.
        return 3;
        return 5;
    }();
    
    // Otherwise, the inferred return type is the first of the types of the return statement expressions
    // in the function body that is a supertype of each of the others, 
    // ignoring return statements with no expressions.
    // A compile - time error occurs if no return statement expression has a type that is a supertype of each of the others.
    // FunctionExpression with no return type annotation with multiple return statements with subtype relation between returns
    class Base { private m; }
    class Derived extends Base { private q; }
    var b: Base;
    var b = function (): Base {
        return new Base(); return new Derived();
    } ();
    
    // FunctionExpression with no return type annotation with multiple return statements with one a recursive call
    var a = function f(): Base {
        ~
!!! error TS2403: Subsequent variable declarations must have the same type.  Variable 'a' must be of type 'any', but here has type 'Base'.
!!! related TS6203 functionImplementations.ts:5:5: 'a' was also declared here.
        return new Base(); return new Derived(); return f(); // ?
    } ();
    
    // FunctionExpression with non -void return type annotation with a single throw statement
    undefined === function (): number {
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        throw undefined;
    ~~~~~~~~~~~~~~~~~~~~
    };
    ~
!!! error TS2839: This condition will always return 'false' since JavaScript compares objects by reference, not value.
    
    // Type of 'this' in function implementation is 'any'
    function thisFunc(): void {
        var x = this;
        var x: any;
    }
    
    // Function signature with optional parameter, no type annotation and initializer has initializer's type
    function opt1(n: number = 4): void {
        var m = n;
        var m: number;
    }
    
    // Function signature with optional parameter, no type annotation and initializer has initializer's widened type
    function opt2(n: {
        x: any;
        y: any;
    } = { x: null, y: undefined }): void {
        var m = n;
        var m: { x: any; y: any };
    }
    
    // Function signature with initializer referencing other parameter to the left
    function opt3(n: number, m: number = n): void {
        var y = m;
        var y: number;
    }
    
    // Function signature with optional parameter has correct codegen 
    // (tested above)
    
    // FunctionExpression with non -void return type annotation return with no expression
    function f6(): number {
        return;
    }
    
    class Derived2 extends Base { private r: string; }
    class AnotherClass { private x }
    // if f is a contextually typed function expression, the inferred return type is the union type
    // of the types of the return statement expressions in the function body, 
    // ignoring return statements with no expressions.
    var f7: (x: number) => string | number = x => { // should be (x: number) => number | string
        if (x < 0) { return x; }
        return x.toString();
    }
    var f8: (x: number) => any = x => { // should be (x: number) => Base
        return new Base();
        return new Derived2();
    }
    var f9: (x: number) => any = x => { // should be (x: number) => Base
        return new Base();
        return new Derived();
        return new Derived2();
    }
    var f10: (x: number) => any = x => { // should be (x: number) => Derived | Derived1
        return new Derived();
        return new Derived2();
    }
    var f11: (x: number) => any = x => { // should be (x: number) => Base | AnotherClass
        return new Base();
        return new AnotherClass();
    }
    var f12: (x: number) => any = x => { // should be (x: number) => Base | AnotherClass
        return new Base();
        return; // should be ignored
        return new AnotherClass();
    }