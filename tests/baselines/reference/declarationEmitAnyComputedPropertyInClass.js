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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
const abcdefgh_1 = __importDefault(require("abcdefgh"));
class C {
    [abcdefgh_1.default.someKey]() { }
    ;
}
exports.C = C;


//// [main.d.ts]
import Test from "abcdefgh";
export declare class C {
    [Test.someKey]: () => void;
}
