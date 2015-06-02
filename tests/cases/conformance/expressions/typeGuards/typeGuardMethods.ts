
class A {
    propA: number;
    isA(): this is A {
        return true;
    }
    isC(): this is C {
        return false;
    }
}

class B {
    propB: number;
    isA(): this is A {
        return false;
    }
    isC(): this is C {
        return false;
    }
}

class C extends A {
    propC: number;
    isA(): this is A {
        return false;
    }
    isC(): this is C {
        return true;
    }
}

class D extends C {
    isA(): this is A {
        return false;
    }
    isString(x: any): x is string { // with parameter declaration
        return true;
    }
}

var a: A;

// Basic.
if (a.isC()) {
    a.propC;
}

// Sub type.
var subType: C;
if(subType.isA()) {
    subType.propC;
}

// Union type.
var union: A | B;
if(union.isA()) {
    union.propA;
}

var b: any;
var d = new D;
if(d.isString(b)) {
    b.length;
}