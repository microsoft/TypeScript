//// [tests/cases/conformance/classes/members/accessibility/privateStaticMemberAccessibility.ts] ////

//// [privateStaticMemberAccessibility.ts]
class Base {
    private static foo: string;
}

class Derived extends Base {
    static bar = Base.foo; // error
    bing = () => Base.foo; // error
}

//// [privateStaticMemberAccessibility.js]
class Base {
    static foo;
}
class Derived extends Base {
    static bar = Base.foo;
    bing = () => Base.foo;
}
