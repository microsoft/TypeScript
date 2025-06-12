//// [tests/cases/conformance/classes/members/accessibility/privateInstanceMemberAccessibility.ts] ////

//// [privateInstanceMemberAccessibility.ts]
class Base {
    private foo: string;
}

class Derived extends Base {
    x = super.foo; // error
    y() {
        return super.foo; // error
    }
    z: typeof super.foo; // error

    a: this.foo; // error
}

//// [privateInstanceMemberAccessibility.js]
class Base {
}
class Derived extends Base {
    constructor() {
        super(...arguments);
        this.x = super.foo; // error
    }
    y() {
        return super.foo; // error
    }
}
