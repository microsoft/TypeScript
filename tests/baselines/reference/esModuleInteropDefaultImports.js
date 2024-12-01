//// [tests/cases/compiler/esModuleInteropDefaultImports.ts] ////

//// [mod.ts]
declare function fun(): void;
export default fun;
//// [a.ts]
import mod = require("./mod");
export = mod;
//// [b.ts]
import a from "./a";
import { default as b } from "./a";
import c, { default as d } from "./a";
import * as self from "./b";
export { default } from "./a";
export { default as def } from "./a";

a === b;
b === c;
c === d;
d === self.default;
self.default === self.def;

// should all fail
a();
b();
c();
d();
self.default();
self.def();

// should all work
a.default();
b.default();
c.default();
d.default();
self.default.default();
self.def.default();

//// [mod.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fun;
//// [a.js]
"use strict";
var mod = require("./mod");
module.exports = mod;
//// [b.js]
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
exports.def = exports.default = void 0;
var a_1 = __importDefault(require("./a"));
var a_2 = __importDefault(require("./a"));
var a_3 = __importDefault(require("./a"));
var self = __importStar(require("./b"));
var a_4 = require("./a");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(a_4).default; } });
var a_5 = require("./a");
Object.defineProperty(exports, "def", { enumerable: true, get: function () { return __importDefault(a_5).default; } });
a_1.default === a_2.default;
a_2.default === a_3.default;
a_3.default === a_3.default;
a_3.default === self.default;
self.default === self.def;
// should all fail
(0, a_1.default)();
(0, a_2.default)();
(0, a_3.default)();
(0, a_3.default)();
self.default();
self.def();
// should all work
a_1.default.default();
a_2.default.default();
a_3.default.default();
a_3.default.default();
self.default.default();
self.def.default();
