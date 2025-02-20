//// [tests/cases/compiler/erasableSyntaxOnly.ts] ////

//// [index.ts]
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

namespace IllegalBecauseNestedInstantiated {
    namespace Nested {
        export const m = 1;
    }
}

enum NotLegalEnum {
    B = 1
}

import NoGoodAlias = NotLegalEnum.B;

const enum NotLegalConstEnum {
    C = 2
}

// No errors after this point
class MyClassOk {
    // Not a parameter property, ok
    constructor(foo: string) { }
}

// Note for implementors: This should not be an error
// as this entire namespace block is fully erased
namespace NotInstantiated {
    export interface JustAType { }
    export type ATypeInANamespace = {};
    namespace Nested {
        export type ATypeInANamespace = {};
    }
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

    import FineAlias = EnumInAmbientContext.B;
}

//// [commonjs.cts]
import foo = require("./other.cjs");
export = foo;


//// [other.d.cts]
declare function foo(): void;
export = foo;


//// [esm.mts]
const foo = 1234;
export default foo;


//// [index.js]
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
var IllegalBecauseNestedInstantiated;
(function (IllegalBecauseNestedInstantiated) {
    var Nested;
    (function (Nested) {
        Nested.m = 1;
    })(Nested || (Nested = {}));
})(IllegalBecauseNestedInstantiated || (IllegalBecauseNestedInstantiated = {}));
var NotLegalEnum;
(function (NotLegalEnum) {
    NotLegalEnum[NotLegalEnum["B"] = 1] = "B";
})(NotLegalEnum || (NotLegalEnum = {}));
var NoGoodAlias = NotLegalEnum.B;
// No errors after this point
var MyClassOk = /** @class */ (function () {
    // Not a parameter property, ok
    function MyClassOk(foo) {
    }
    return MyClassOk;
}());
//// [commonjs.cjs]
"use strict";
var foo = require("./other.cjs");
module.exports = foo;
//// [esm.mjs]
var foo = 1234;
export default foo;
