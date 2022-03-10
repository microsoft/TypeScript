//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReexportAliasesEsModuleInterop.ts] ////

//// [cls.js]
class Foo {}
module.exports = Foo;

//// [usage.js]
import {default as Fooa} from "./cls";

export const x = new Fooa();

export {default as Foob} from "./cls";


//// [cls.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
module.exports = Foo;
//// [usage.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foob = exports.x = void 0;
var cls_1 = __importDefault(require("./cls"));
exports.x = new cls_1.default();
var cls_2 = require("./cls");
Object.defineProperty(exports, "Foob", { enumerable: true, get: function () { return __importDefault(cls_2).default; } });


//// [cls.d.ts]
export = Foo;
declare class Foo {
}
//// [usage.d.ts]
export const x: Fooa;
export { default as Foob } from "./cls";
import { default as Fooa } from "./cls";
