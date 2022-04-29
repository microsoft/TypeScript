class Base {
    protected static x: string;
    static staticMethod() {
        Base.x;         // OK, accessed within their declaring class
        Derived1.x;     // OK, accessed within their declaring class
        Derived2.x;     // OK, accessed within their declaring class
        Derived3.x;     // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
    }
}

class Derived1 extends Base {
    static staticMethod1() {
        Base.x;         // OK, accessed within a class derived from their declaring class
        Derived1.x;     // OK, accessed within a class derived from their declaring class
        Derived2.x;     // OK, accessed within a class derived from their declaring class
        Derived3.x;     // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
    }
}

class Derived2 extends Base {
    static staticMethod2() {
        Base.x;         // OK, accessed within a class derived from their declaring class
        Derived1.x;     // OK, accessed within a class derived from their declaring class
        Derived2.x;     // OK, accessed within a class derived from their declaring class
        Derived3.x;     // Error, redefined in a subclass, can only be accessed in the declaring class or one of its subclasses
    }
}

class Derived3 extends Derived1 {
    protected static x: string;
    static staticMethod3() {
        Base.x;         // OK, accessed within a class derived from their declaring class
        Derived1.x;     // OK, accessed within a class derived from their declaring class
        Derived2.x;     // OK, accessed within a class derived from their declaring class
        Derived3.x;     // OK, accessed within their declaring class
    }
}


Base.x;         // Error, neither within their declaring class nor classes derived from their declaring class
Derived1.x;     // Error, neither within their declaring class nor classes derived from their declaring class
Derived2.x;     // Error, neither within their declaring class nor classes derived from their declaring class
Derived3.x;     // Error, neither within their declaring class nor classes derived from their declaring class