//// [tests/cases/compiler/unusedClassesinNamespace3.ts] ////

//// [unusedClassesinNamespace3.ts]
namespace Validation {
    class c1 {

    }

    export class c2 {

    }

    export let a = new c1();
}

//// [unusedClassesinNamespace3.js]
var Validation;
(function (Validation) {
    class c1 {
    }
    class c2 {
    }
    Validation.c2 = c2;
    Validation.a = new c1();
})(Validation || (Validation = {}));
