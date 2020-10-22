//// [tests/cases/compiler/esModuleInteropNamedDefaultImports.ts] ////

//// [mod.ts]
export default class Foo {}
export class Bar {}
//// [idx.ts]
import Foo from "./mod";
import { default as Foo2 } from "./mod";
import { Bar, default as Foo3 } from "./mod";
new Foo();
new Foo2();
new Bar();
new Foo3();

//// [mod.js]
"use strict";
exports.__esModule = true;
exports.Bar = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports["default"] = Foo;
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
exports.Bar = Bar;
//// [idx.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mod_1 = __importDefault(require("./mod"));
var mod_2 = __importDefault(require("./mod"));
var mod_3 = __importStar(require("./mod"));
new mod_1["default"]();
new mod_2["default"]();
new mod_3.Bar();
new mod_3["default"]();
