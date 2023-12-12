//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesPublicMembers.ts] ////

//// [derivedClassOverridesPublicMembers.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    a: typeof x;
    b(a: typeof x) { }
    get c() { return x; }
    set c(v: typeof x) { }
    d: (a: typeof x) => void;

    static r: typeof x;
    static s(a: typeof x) { }
    static get t() { return x; }
    static set t(v: typeof x) { }
    static u: (a: typeof x) => void;

    constructor(a: typeof x) { }
}

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

    constructor(a: typeof y) { super(x) }
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



//// [derivedClassOverridesPublicMembers.d.ts]
declare var x: {
    foo: string;
};
declare var y: {
    foo: string;
    bar: string;
};
declare class Base {
    a: typeof x;
    b(a: typeof x): invalid;
    get c(): typeof x;
    set c(v: typeof x);
    d: (a: typeof x) => void;
    static r: typeof x;
    static s(a: typeof x): invalid;
    static get t(): typeof x;
    static set t(v: typeof x);
    static u: (a: typeof x) => void;
    constructor(a: typeof x);
}
declare class Derived extends Base {
    a: typeof y;
    b(a: typeof y): invalid;
    get c(): typeof y;
    set c(v: typeof y);
    d: (a: typeof y) => void;
    static r: typeof y;
    static s(a: typeof y): invalid;
    static get t(): typeof y;
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

derivedClassOverridesPublicMembers.ts(6,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(12,12): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(22,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(28,12): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(37,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(38,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(39,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(40,11): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(42,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(43,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(44,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(45,11): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(59,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
derivedClassOverridesPublicMembers.ts(60,10): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.


==== derivedClassOverridesPublicMembers.ts (14 errors) ====
    var x: { foo: string; }
    var y: { foo: string; bar: string; }
    
    class Base {
        a: typeof x;
        b(a: typeof x) { }
        ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 derivedClassOverridesPublicMembers.ts:6:5: Add a return type to the method
        get c() { return x; }
        set c(v: typeof x) { }
        d: (a: typeof x) => void;
    
        static r: typeof x;
        static s(a: typeof x) { }
               ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 derivedClassOverridesPublicMembers.ts:12:12: Add a return type to the method
        static get t() { return x; }
        static set t(v: typeof x) { }
        static u: (a: typeof x) => void;
    
        constructor(a: typeof x) { }
    }
    
    class Derived extends Base {
        a: typeof y;
        b(a: typeof y) { }
        ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 derivedClassOverridesPublicMembers.ts:22:5: Add a return type to the method
        get c() { return y; }
        set c(v: typeof y) { }
        d: (a: typeof y) => void;
    
        static r: typeof y;
        static s(a: typeof y) { }
               ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 derivedClassOverridesPublicMembers.ts:28:12: Add a return type to the method
        static get t() { return y; }
        static set t(a: typeof y) { }
        static u: (a: typeof y) => void;
    
        constructor(a: typeof y) { super(x) }
    }
    
    var d: Derived = new Derived(y);
    var r1 = d.a;
             ~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesPublicMembers.ts:37:5: Add a type annotation to the variable r1.
    var r2 = d.b(y);
             ~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesPublicMembers.ts:38:5: Add a type annotation to the variable r2.
    var r3 = d.c;
             ~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesPublicMembers.ts:39:5: Add a type annotation to the variable r3.
    var r3a = d.d;
              ~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesPublicMembers.ts:40:5: Add a type annotation to the variable r3a.
    d.c = y;
    var r4 = Derived.r;
             ~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesPublicMembers.ts:42:5: Add a type annotation to the variable r4.
    var r5 = Derived.s(y);
             ~~~~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesPublicMembers.ts:43:5: Add a type annotation to the variable r5.
    var r6 = Derived.t;
             ~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesPublicMembers.ts:44:5: Add a type annotation to the variable r6.
    var r6a = Derived.u;
              ~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesPublicMembers.ts:45:5: Add a type annotation to the variable r6a.
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
!!! related TS9027 derivedClassOverridesPublicMembers.ts:59:5: Add a type annotation to the variable r7.
    var r8 = d2[1];
             ~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9027 derivedClassOverridesPublicMembers.ts:60:5: Add a type annotation to the variable r8.
    
    