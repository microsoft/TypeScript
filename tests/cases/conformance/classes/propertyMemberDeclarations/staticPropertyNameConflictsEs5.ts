// @target: es5   

// static name
class A {
    static name: number; // error
    name: string; // ok
}

class B {
    static name() {} // error
    name() {} // ok
}



// static length...
class C {
    static length: number; // error
    length: string; // ok
}

class D {
    static length() {} // error
    length() {} // ok
}

