//// [tests/cases/conformance/classes/members/accessibility/privateStaticNotAccessibleInClodule2.ts] ////

//// [privateStaticNotAccessibleInClodule2.ts]
// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.

class C {
    private foo: string;
    private static bar: string;
}

class D extends C {
    baz: number;   
}

module D {
    export var y = D.bar; // error
}

//// [privateStaticNotAccessibleInClodule2.js]
class C {
    foo;
    static bar;
}
class D extends C {
    baz;
}
(function (D) {
    D.y = D.bar;
})(D || (D = {}));
