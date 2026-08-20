//// [tests/cases/compiler/reexportDefaultIsCallable.ts] ////

//// [schema.d.ts]
export default class Schema {}
//// [reexporter.d.ts]
export { default } from "./schema";
//// [usage.ts]
import Base from "./reexporter";
export default class Mine extends Base {}


//// [usage.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reexporter_1 = __importDefault(require("./reexporter"));
class Mine extends reexporter_1.default {
}
exports.default = Mine;
