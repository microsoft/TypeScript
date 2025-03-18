//// [tests/cases/conformance/classes/members/accessibility/protectedClassPropertyAccessibleWithinSubclass3.ts] ////

//// [protectedClassPropertyAccessibleWithinSubclass3.ts]
class Base {
    protected x: string;
    method() {
        this.x;            // OK, accessed within their declaring class
    }
}

class Derived extends Base {
    method1() {
        this.x;            // OK, accessed within a subclass of the declaring class
        super.x;           // Error, x is not public
    }
}

//// [protectedClassPropertyAccessibleWithinSubclass3.js]
class Base {
    x;
    method() {
        this.x;
    }
}
class Derived extends Base {
    method1() {
        this.x;
        super.x;
    }
}
