//// [tests/cases/compiler/unusedClassesinNamespace5.ts] ////

//// [unusedClassesinNamespace5.ts]
namespace Validation {
    class c1 {

    }

    export class c2 {

    }

    class c3 {
        public x: c1;
    }
}

//// [unusedClassesinNamespace5.js]
var Validation;
(function (Validation) {
    class c1 {
    }
    class c2 {
    }
    Validation.c2 = c2;
    class c3 {
        x;
    }
})(Validation || (Validation = {}));
