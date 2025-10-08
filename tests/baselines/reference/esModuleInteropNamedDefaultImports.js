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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.default = Foo;
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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mod_1 = __importDefault(require("./mod"));
var mod_2 = __importDefault(require("./mod"));
var mod_3 = __importStar(require("./mod"));
new mod_1.default();
new mod_2.default();
new mod_3.Bar();
new mod_3.default();
