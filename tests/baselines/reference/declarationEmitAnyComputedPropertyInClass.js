//// [tests/cases/compiler/declarationEmitAnyComputedPropertyInClass.ts] ////

//// [ambient.d.ts]
declare module "abcdefgh";

//// [main.ts]
import Test from "abcdefgh";

export class C {
    [Test.someKey]() {};
}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var abcdefgh_1 = require("abcdefgh");
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype[abcdefgh_1.default.someKey] = function () { };
    ;
    return C;
}());
exports.C = C;


//// [main.d.ts]
import Test from "abcdefgh";
export declare class C {
    [Test.someKey]: () => void;
}
