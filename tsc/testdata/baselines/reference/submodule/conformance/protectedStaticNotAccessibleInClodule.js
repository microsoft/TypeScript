//// [tests/cases/conformance/classes/members/accessibility/protectedStaticNotAccessibleInClodule.ts] ////

//// [protectedStaticNotAccessibleInClodule.ts]
// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.

class C {
    public static foo: string;
    protected static bar: string;
}

module C {
    export var f = C.foo; // OK
    export var b = C.bar; // error
}

//// [protectedStaticNotAccessibleInClodule.js]
class C {
    static foo;
    static bar;
}
(function (C) {
    C.f = C.foo;
    C.b = C.bar;
})(C || (C = {}));
