//// [tests/cases/compiler/tsxDefaultImports.ts] ////

//// [a.ts]
enum SomeEnum {
  one,
}
export default class SomeClass {
  public static E = SomeEnum;
}

//// [b.ts]
import {default as Def} from "./a"
let a = Def.E.one;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SomeEnum;
(function (SomeEnum) {
    SomeEnum[SomeEnum["one"] = 0] = "one";
})(SomeEnum || (SomeEnum = {}));
class SomeClass {
    static E = SomeEnum;
}
exports.default = SomeClass;
//// [b.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = __importDefault(require("./a"));
let a = a_1.default.E.one;
