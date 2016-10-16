// @target: es6


// static name
class A {
    static name: string; // ok
    name: string; // ok
}

class B {
    static name() {}; // ok
    name() {}; // ok
}


// static length
class C {
    static length: number; // ok
    length: string; // ok
}

class D {
    static length() {} // ok
    length() {} // ok
}
