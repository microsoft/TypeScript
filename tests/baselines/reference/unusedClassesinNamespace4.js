//// [tests/cases/compiler/unusedClassesinNamespace4.ts] ////

//// [unusedClassesinNamespace4.ts]
namespace Validation {
    class c1 {

    }

    export class c2 {

    }

    class c3 extends c1 {

    }
}

//// [unusedClassesinNamespace4.js]
var Validation;
(function (Validation) {
    class c1 {
    }
    class c2 {
    }
    Validation.c2 = c2;
    class c3 extends c1 {
    }
})(Validation || (Validation = {}));
