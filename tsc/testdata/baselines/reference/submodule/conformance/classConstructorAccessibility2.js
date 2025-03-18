//// [tests/cases/conformance/classes/constructorDeclarations/classConstructorAccessibility2.ts] ////

//// [classConstructorAccessibility2.ts]
class BaseA {
    public constructor(public x: number) { }
    createInstance() { new BaseA(1); }
}

class BaseB {
    protected constructor(public x: number) { }
    createInstance() { new BaseB(2); }
}

class BaseC {
    private constructor(public x: number) { }
    createInstance() { new BaseC(3); }
    static staticInstance() { new BaseC(4); }
}

class DerivedA extends BaseA {
    constructor(public x: number) { super(x); }
    createInstance() { new DerivedA(5); }
    createBaseInstance() { new BaseA(6); }
    static staticBaseInstance() { new BaseA(7); }
}

class DerivedB extends BaseB {
    constructor(public x: number) { super(x); }
    createInstance() { new DerivedB(7); }
    createBaseInstance() { new BaseB(8); } // ok
    static staticBaseInstance() { new BaseB(9); } // ok
}

class DerivedC extends BaseC { // error
    constructor(public x: number) { super(x); }
    createInstance() { new DerivedC(9); }
    createBaseInstance() { new BaseC(10); } // error
    static staticBaseInstance() { new BaseC(11); } // error
}

var ba = new BaseA(1);
var bb = new BaseB(1); // error
var bc = new BaseC(1); // error

var da = new DerivedA(1);
var db = new DerivedB(1);
var dc = new DerivedC(1);


//// [classConstructorAccessibility2.js]
class BaseA {
    x;
    constructor(x) {
        this.x = x;
    }
    createInstance() { new BaseA(1); }
}
class BaseB {
    x;
    constructor(x) {
        this.x = x;
    }
    createInstance() { new BaseB(2); }
}
class BaseC {
    x;
    constructor(x) {
        this.x = x;
    }
    createInstance() { new BaseC(3); }
    static staticInstance() { new BaseC(4); }
}
class DerivedA extends BaseA {
    x;
    constructor(x) {
        this.x = x;
        super(x);
    }
    createInstance() { new DerivedA(5); }
    createBaseInstance() { new BaseA(6); }
    static staticBaseInstance() { new BaseA(7); }
}
class DerivedB extends BaseB {
    x;
    constructor(x) {
        this.x = x;
        super(x);
    }
    createInstance() { new DerivedB(7); }
    createBaseInstance() { new BaseB(8); }
    static staticBaseInstance() { new BaseB(9); }
}
class DerivedC extends BaseC {
    x;
    constructor(x) {
        this.x = x;
        super(x);
    }
    createInstance() { new DerivedC(9); }
    createBaseInstance() { new BaseC(10); }
    static staticBaseInstance() { new BaseC(11); }
}
var ba = new BaseA(1);
var bb = new BaseB(1);
var bc = new BaseC(1);
var da = new DerivedA(1);
var db = new DerivedB(1);
var dc = new DerivedC(1);
