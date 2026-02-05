//// [tests/cases/conformance/internalModules/importDeclarations/circularImportAlias.ts] ////

//// [circularImportAlias.ts]
// expected no error

namespace B {
    export import a = A;
    export class D extends a.C {
        id: number;
    }
}

namespace A {
    export class C { name: string }
    export import b = B;
}

var c: { name: string };
var c = new B.a.C();




//// [circularImportAlias.js]
"use strict";
// expected no error
var B;
(function (B) {
    B.a = A;
    class D extends B.a.C {
        id;
    }
    B.D = D;
})(B || (B = {}));
var A;
(function (A) {
    class C {
        name;
    }
    A.C = C;
    A.b = B;
})(A || (A = {}));
var c;
var c = new B.a.C();
