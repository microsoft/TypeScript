//// [tests/cases/compiler/unusedClassesinNamespace2.ts] ////

//// [unusedClassesinNamespace2.ts]
namespace Validation {
    class c1 {

    }

    export class c2 {

    }
}

//// [unusedClassesinNamespace2.js]
var Validation;
(function (Validation) {
    class c1 {
    }
    class c2 {
    }
    Validation.c2 = c2;
})(Validation || (Validation = {}));
