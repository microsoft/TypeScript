//// [tests/cases/conformance/classes/classDeclarations/classAndInterfaceWithSameName.ts] ////

//// [classAndInterfaceWithSameName.ts]
class C { foo: string; }
interface C { foo: string; }

namespace M {
    class D {
        bar: string;
    }

    interface D {
        bar: string;
    }
}

//// [classAndInterfaceWithSameName.js]
"use strict";
class C {
    foo;
}
var M;
(function (M) {
    class D {
        bar;
    }
})(M || (M = {}));
