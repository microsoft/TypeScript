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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var mod_1 = __importDefault(require("./mod"));
var mod_2 = __importDefault(require("./mod"));
var mod_3 = __importStar(require("./mod"));
new mod_1["default"]();
new mod_2["default"]();
new mod_3.Bar();
new mod_3["default"]();
