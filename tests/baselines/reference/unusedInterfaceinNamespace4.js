//// [tests/cases/compiler/unusedInterfaceinNamespace4.ts] ////

//// [unusedInterfaceinNamespace4.ts]
namespace Validation {
    interface i1 {

    }

    export interface i2 {

    }

    interface i3 extends i1 {

    }

    export class c1 implements i3 {

    }
}

//// [unusedInterfaceinNamespace4.js]
var Validation;
(function (Validation) {
    class c1 {
    }
    Validation.c1 = c1;
})(Validation || (Validation = {}));
