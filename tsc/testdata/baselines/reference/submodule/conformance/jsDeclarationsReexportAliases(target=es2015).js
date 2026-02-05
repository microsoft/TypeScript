//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReexportAliases.ts] ////

//// [cls.js]
export default class Foo {}

//// [usage.js]
import {default as Fooa} from "./cls";

export const x = new Fooa();

export {default as Foob} from "./cls";


//// [cls.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Foo {
}
exports.default = Foo;
//// [usage.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foob = exports.x = void 0;
const cls_1 = __importDefault(require("./cls"));
exports.x = new cls_1.default();
const cls_2 = require("./cls");
Object.defineProperty(exports, "Foob", { enumerable: true, get: function () { return __importDefault(cls_2).default; } });


//// [cls.d.ts]
export default class Foo {
}
//// [usage.d.ts]
import { default as Fooa } from "./cls";
export declare const x: Fooa;
export { default as Foob } from "./cls";
