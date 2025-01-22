//// [tests/cases/compiler/erasableSyntaxOnly.ts] ////

//// [erasableSyntaxOnly.ts]
class MyClassErr {
    // No parameter properties
    constructor(public foo: string) { }
}

namespace IllegalBecauseInstantiated {
    export const m = 1;
}

namespace AlsoIllegalBecauseInstantiated {
    class PrivateClass {

    }
}

enum NotLegalEnum {
    B = 1
}

const enum NotLegalConstEnum {
    C = 2
}

// No errors after this point
class MyClassOk {
    // Not a parameter property, ok
    constructor(foo: string) { }
}
namespace NotInstantiated {
    export interface JustAType { }
    export type ATypeInANamespace = {};
}
declare namespace AmbientIsNotInstantiated {
    export const stillOk = 12;
}

declare enum LegalEnum {
    A = 1
}

declare namespace AmbientStuff {
    namespace Nested {
        export const stillOk = 12;
    }
    enum EnumInAmbientContext {
        B = 1
    }
}


//// [erasableSyntaxOnly.js]
var MyClassErr = /** @class */ (function () {
    // No parameter properties
    function MyClassErr(foo) {
        this.foo = foo;
    }
    return MyClassErr;
}());
var IllegalBecauseInstantiated;
(function (IllegalBecauseInstantiated) {
    IllegalBecauseInstantiated.m = 1;
})(IllegalBecauseInstantiated || (IllegalBecauseInstantiated = {}));
var AlsoIllegalBecauseInstantiated;
(function (AlsoIllegalBecauseInstantiated) {
    var PrivateClass = /** @class */ (function () {
        function PrivateClass() {
        }
        return PrivateClass;
    }());
})(AlsoIllegalBecauseInstantiated || (AlsoIllegalBecauseInstantiated = {}));
var NotLegalEnum;
(function (NotLegalEnum) {
    NotLegalEnum[NotLegalEnum["B"] = 1] = "B";
})(NotLegalEnum || (NotLegalEnum = {}));
// No errors after this point
var MyClassOk = /** @class */ (function () {
    // Not a parameter property, ok
    function MyClassOk(foo) {
    }
    return MyClassOk;
}());
