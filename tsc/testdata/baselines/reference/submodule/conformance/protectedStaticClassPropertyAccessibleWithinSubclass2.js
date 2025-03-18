//// [tests/cases/conformance/classes/members/accessibility/protectedStaticClassPropertyAccessibleWithinSubclass2.ts] ////

//// [protectedStaticClassPropertyAccessibleWithinSubclass2.ts]
class Base {
    protected static x: string;
    static staticMethod() {
        this.x;         // OK, accessed within their declaring class
    }
}

class Derived1 extends Base {
    static staticMethod1() {
        this.x;         // OK, accessed within a class derived from their declaring class
        super.x;        // Error, x is not public
    }
}

class Derived2 extends Derived1 {
    protected static x: string;
    static staticMethod3() {
        this.x;         // OK, accessed within a class derived from their declaring class
        super.x;        // Error, x is not public
    }
}

//// [protectedStaticClassPropertyAccessibleWithinSubclass2.js]
class Base {
    static x;
    static staticMethod() {
        this.x;
    }
}
class Derived1 extends Base {
    static staticMethod1() {
        this.x;
        super.x;
    }
}
class Derived2 extends Derived1 {
    static x;
    static staticMethod3() {
        this.x;
        super.x;
    }
}
