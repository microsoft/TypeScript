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
const abcdefgh_1 = require("abcdefgh");
class C {
    [abcdefgh_1.default.someKey]() { }
    ;
}
exports.C = C;
