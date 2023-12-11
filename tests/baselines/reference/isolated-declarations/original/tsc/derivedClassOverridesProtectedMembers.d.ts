//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesProtectedMembers.ts] ////

//// [derivedClassOverridesProtectedMembers.ts]
var x: { foo: string; }
var y: { foo: string; bar: string; }

class Base {
    protected a: typeof x;
    protected b(a: typeof x) { }
    protected get c() { return x; }
    protected set c(v: typeof x) { }
    protected d: (a: typeof x) => void;

    protected static r: typeof x;
    protected static s(a: typeof x) { }
    protected static get t() { return x; }
    protected static set t(v: typeof x) { }
    protected static u: (a: typeof x) => void;

    constructor(a: typeof x) { }
}

class Derived extends Base {
    protected a: typeof y;
    protected b(a: typeof y) { }
    protected get c() { return y; }
    protected set c(v: typeof y) { }
    protected d: (a: typeof y) => void;

    protected static r: typeof y;
    protected static s(a: typeof y) { }
    protected static get t() { return y; }
    protected static set t(a: typeof y) { }
    protected static u: (a: typeof y) => void;

    constructor(a: typeof y) { super(x) }
}


/// [Declarations] ////



//// [derivedClassOverridesProtectedMembers.d.ts]
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
    protected a: typeof y;
    protected b(a: typeof y): invalid;
    protected get c(): {
        foo: string;
        bar: string;
    };
    protected set c(v: typeof y);
    protected d: (a: typeof y) => void;
    protected static r: typeof y;
    protected static s(a: typeof y): invalid;
    protected static get t(): {
        foo: string;
        bar: string;
    };
    protected static set t(a: typeof y);
    protected static u: (a: typeof y) => void;
    constructor(a: typeof y);
}

/// [Errors] ////

derivedClassOverridesProtectedMembers.ts(6,15): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
derivedClassOverridesProtectedMembers.ts(12,22): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
derivedClassOverridesProtectedMembers.ts(22,15): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
derivedClassOverridesProtectedMembers.ts(28,22): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations


==== derivedClassOverridesProtectedMembers.ts (4 errors) ====
    var x: { foo: string; }
    var y: { foo: string; bar: string; }
    
    class Base {
        protected a: typeof x;
        protected b(a: typeof x) { }
                  ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 derivedClassOverridesProtectedMembers.ts:6:15: Add a return type to the method
        protected get c() { return x; }
        protected set c(v: typeof x) { }
        protected d: (a: typeof x) => void;
    
        protected static r: typeof x;
        protected static s(a: typeof x) { }
                         ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 derivedClassOverridesProtectedMembers.ts:12:22: Add a return type to the method
        protected static get t() { return x; }
        protected static set t(v: typeof x) { }
        protected static u: (a: typeof x) => void;
    
        constructor(a: typeof x) { }
    }
    
    class Derived extends Base {
        protected a: typeof y;
        protected b(a: typeof y) { }
                  ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 derivedClassOverridesProtectedMembers.ts:22:15: Add a return type to the method
        protected get c() { return y; }
        protected set c(v: typeof y) { }
        protected d: (a: typeof y) => void;
    
        protected static r: typeof y;
        protected static s(a: typeof y) { }
                         ~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 derivedClassOverridesProtectedMembers.ts:28:22: Add a return type to the method
        protected static get t() { return y; }
        protected static set t(a: typeof y) { }
        protected static u: (a: typeof y) => void;
    
        constructor(a: typeof y) { super(x) }
    }
    