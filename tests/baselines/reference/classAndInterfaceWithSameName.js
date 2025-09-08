//// [tests/cases/conformance/classes/classDeclarations/classAndInterfaceWithSameName.ts] ////

//// [classAndInterfaceWithSameName.ts]
class C { foo: string; }
interface C { foo: string; }

module M {
    class D {
        bar: string;
    }

    interface D {
        bar: string;
    }
}

//// [classAndInterfaceWithSameName.js]
class C {
    foo;
}
var M;
(function (M) {
    class D {
        bar;
    }
})(M || (M = {}));
