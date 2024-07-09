// Class with protected members
class C1 {
    protected x: number;
    protected static sx: number;
    protected f() {
        return this.x;
    }
    protected static sf() {
        return this.sx;
    }
}

// Derived class accessing protected members
class C2 extends C1 {
    protected f() {
        return super.f() + this.x;
    }
    protected static sf() {
        return super.sf() + this.sx;
    }
}

// Derived class making protected members public
class C3 extends C2 {
    x: number;
    static sx: number;
    f() {
        return super.f();
    }
    static sf() {
        return super.sf();
    }
}

var c1: C1;
var c2: C2;
var c3: C3;

// All of these should be errors
c1.x;
c1.f();
C1.sx;
C1.sf();

// All of these should be errors
c2.x;
c2.f();
C2.sx;
C2.sf();

// All of these should be ok
c3.x;
c3.f();
C3.sx;
C3.sf();

class A {
    protected x;
}

class B extends A {
    y;
}

class C extends A {
    z;
    static foo(a: A, b: B, c: C, d: D, e: E) {
        a.x = 1;  // Error, access must be through C or type derived from C
        b.x = 1;  // Error, access must be through C or type derived from C
        c.x = 1;
        d.x = 1;
        e.x = 1;
    }
}

class D extends C {
    d;
}

interface E extends C {
    e;
}

class CC {
    protected constructor() {
    }
}

class A1 {
    protected x;
}
class B1 {
    x;
}
var a1: A1;
var b1: B1;
a1 = b1;  // Error, B1 doesn't derive from A1
b1 = a1;  // Error, x is protected in A1 but public in B1

class A2 {
    protected x;
}
class B2 extends A2 {
    x;
}

class A3 {
    x;
}
// Error x is protected in B3 but public in A3
class B3 extends A3 {
    protected x;
}

