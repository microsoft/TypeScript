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

// Not erasable
(()=><any>{})();
(()=>< any >{})();
(()=> < any > {})();

// Erasable
(()=><any>({}))();
(()=>(<any>{}))();
<any>{};


// return and yield ASI
function *gen() {
    yield <any>
        1;
    return <any>
        1;
}

// at the start of an ExpressionStatement if followed by an object literal; though I'm not sure why one would use it there
<unknown>{foo() {}}.foo();

// at the start of an ExpressionStatement if followed by function keyword
<unknown>function() {}();
<unknown>function() {};

// at the start of an ExpressionStatement if followed by an anonymous class expression
// note that this exact syntax currently emits invalid JS (no parenthesis added like for function above)
<unknown>class {}

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
// Not erasable
(function () { return ({}); })();
(function () { return ({}); })();
(function () { return ({}); })();
// Erasable
(function () { return ({}); })();
(function () { return ({}); })();
({});
// return and yield ASI
function gen() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, 1];
            case 1:
                _a.sent();
                return [2 /*return*/, 1];
        }
    });
}
// at the start of an ExpressionStatement if followed by an object literal; though I'm not sure why one would use it there
({ foo: function () { } }.foo());
// at the start of an ExpressionStatement if followed by function keyword
(function () { })();
(function () { });
// at the start of an ExpressionStatement if followed by an anonymous class expression
// note that this exact syntax currently emits invalid JS (no parenthesis added like for function above)
/** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
//// [commonjs.cjs]
"use strict";
var foo = require("./other.cjs");
module.exports = foo;
//// [esm.mjs]
var foo = 1234;
export default foo;
