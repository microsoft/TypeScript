//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesProtectedMembers2.ts] ////

//// [derivedClassOverridesProtectedMembers2.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    protected a: typeof x;
    protected b(a: typeof x) { }
    protected get c() { return x; }
    protected set c(v: typeof x) { }
    protected d: (a: typeof x) => void ;

    protected static r: typeof x;
    protected static s(a: typeof x) { }
    protected static get t() { return x; }
    protected static set t(v: typeof x) { }
    protected static u: (a: typeof x) => void ;

constructor(a: typeof x) { }
}

// Increase visibility of all protected members to public
class Derived extends Base {
    a: typeof y;
    b(a: typeof y) { }
    get c() { return y; }
    set c(v: typeof y) { }
    d: (a: typeof y) => void;

    static r: typeof y;
    static s(a: typeof y) { }
    static get t() { return y; }
    static set t(a: typeof y) { }
    static u: (a: typeof y) => void;

    constructor(a: typeof y) { super(a); }
}

var d: Derived = new Derived(y);
var r1 = d.a;
var r2 = d.b(y);
var r3 = d.c;
var r3a = d.d;
d.c = y;
var r4 = Derived.r;
var r5 = Derived.s(y);
var r6 = Derived.t;
var r6a = Derived.u;
Derived.t = y;

class Base2 {
    [i: string]: Object;
    [i: number]: typeof x;
}

class Derived2 extends Base2 {
    [i: string]: typeof x;
    [i: number]: typeof y;
}

var d2: Derived2;
var r7 = d2[''];
var r8 = d2[1];



/// [Declarations] ////



//// [derivedClassOverridesProtectedMembers2.d.ts]
declare var x: {
    foo: string;
};
declare var y: {
    foo: string;
    bar: string;
};
declare class Base {
    protected a: typeof x;
    protected b(a: typeof x): invalid;
    protected get c(): {
        foo: string;
    };
    protected set c(v: typeof x);
    protected d: (a: typeof x) => void;
    protected static r: typeof x;
    protected static s(a: typeof x): invalid;
    protected static get t(): {
        foo: string;
    };
    protected static set t(v: typeof x);
    protected static u: (a: typeof x) => void;
    constructor(a: typeof x);
}
declare class Derived extends Base {
    a: typeof y;
    b(a: typeof y): invalid;
    get c(): {
        foo: string;
        bar: string;
    };
    set c(v: typeof y);
    d: (a: typeof y) => void;
    static r: typeof y;
    static s(a: typeof y): invalid;
    static get t(): {
        foo: string;
        bar: string;
    };
    static set t(a: typeof y);
    static u: (a: typeof y) => void;
    constructor(a: typeof y);
}
declare var d: Derived;
declare var r1: invalid;
declare var r2: invalid;
declare var r3: invalid;
declare var r3a: invalid;
declare var r4: invalid;
declare var r5: invalid;
declare var r6: invalid;
declare var r6a: invalid;
declare class Base2 {
    [i: string]: Object;
    [i: number]: typeof x;
}
declare class Derived2 extends Base2 {
    [i: string]: typeof x;
    [i: number]: typeof y;
}
declare var d2: Derived2;
declare var r7: invalid;
declare var r8: invalid;

/// [Errors] ////

derivedClassOverridesProtectedMembers2.ts(6,15): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(12,22): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(23,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(29,12): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(38,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(39,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(40,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(41,11): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(43,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(44,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(45,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(46,11): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(60,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesProtectedMembers2.ts(61,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== derivedClassOverridesProtectedMembers2.ts (14 errors) ====
    var x: { foo: string; }
    var y: { foo: string; bar: string; }
    
    class Base {
        protected a: typeof x;
        protected b(a: typeof x) { }
                  ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 derivedClassOverridesProtectedMembers2.ts:6:15: Add a return type to the method
        protected get c() { return x; }
        protected set c(v: typeof x) { }
        protected d: (a: typeof x) => void ;
    
        protected static r: typeof x;
        protected static s(a: typeof x) { }
                         ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 derivedClassOverridesProtectedMembers2.ts:12:22: Add a return type to the method
        protected static get t() { return x; }
        protected static set t(v: typeof x) { }
        protected static u: (a: typeof x) => void ;
    
    constructor(a: typeof x) { }
    }
    
    // Increase visibility of all protected members to public
    class Derived extends Base {
        a: typeof y;
        b(a: typeof y) { }
        ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 derivedClassOverridesProtectedMembers2.ts:23:5: Add a return type to the method
        get c() { return y; }
        set c(v: typeof y) { }
        d: (a: typeof y) => void;
    
        static r: typeof y;
        static s(a: typeof y) { }
               ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 derivedClassOverridesProtectedMembers2.ts:29:12: Add a return type to the method
        static get t() { return y; }
        static set t(a: typeof y) { }
        static u: (a: typeof y) => void;
    
        constructor(a: typeof y) { super(a); }
    }
    
    var d: Derived = new Derived(y);
    var r1 = d.a;
             ~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:38:5: Add a type annotation to the variable r1.
    var r2 = d.b(y);
             ~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:39:5: Add a type annotation to the variable r2.
    var r3 = d.c;
             ~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:40:5: Add a type annotation to the variable r3.
    var r3a = d.d;
              ~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:41:5: Add a type annotation to the variable r3a.
    d.c = y;
    var r4 = Derived.r;
             ~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:43:5: Add a type annotation to the variable r4.
    var r5 = Derived.s(y);
             ~~~~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:44:5: Add a type annotation to the variable r5.
    var r6 = Derived.t;
             ~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:45:5: Add a type annotation to the variable r6.
    var r6a = Derived.u;
              ~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:46:5: Add a type annotation to the variable r6a.
    Derived.t = y;
    
    class Base2 {
        [i: string]: Object;
        [i: number]: typeof x;
    }
    
    class Derived2 extends Base2 {
        [i: string]: typeof x;
        [i: number]: typeof y;
    }
    
    var d2: Derived2;
    var r7 = d2[''];
             ~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:60:5: Add a type annotation to the variable r7.
    var r8 = d2[1];
             ~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesProtectedMembers2.ts:61:5: Add a type annotation to the variable r8.
    
    