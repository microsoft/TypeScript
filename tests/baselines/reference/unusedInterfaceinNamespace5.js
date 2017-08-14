//// [unusedInterfaceinNamespace5.ts]
namespace Validation {
    interface i1 {

    }

    export interface i2 {

    }

    interface i3 extends i1 {

    }

    export class c1 implements i3 {

    }

    interface i4 {

    }

    export let c2:i4;
}

//// [unusedInterfaceinNamespace5.js]
var Validation;
(function (Validation) {
    var c1 = /** @class */ (function () {
        function c1() {
        }
        return c1;
    }());
    Validation.c1 = c1;
})(Validation || (Validation = {}));
