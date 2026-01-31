//// [tests/cases/compiler/unusedClassesinNamespace1.ts] ////

//// [unusedClassesinNamespace1.ts]
namespace Validation {
    class c1 {

    }
}

//// [unusedClassesinNamespace1.js]
var Validation;
(function (Validation) {
    class c1 {
    }
})(Validation || (Validation = {}));
