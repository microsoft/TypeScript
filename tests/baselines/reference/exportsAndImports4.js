//// [tests/cases/conformance/es6/modules/exportsAndImports4.ts] ////

//// [t1.ts]
export default "hello";

//// [t2.ts]
import a = require("./t1");
a.default;
import b from "./t1";
b;
import * as c from "./t1";
c.default;
import { default as d } from "./t1";
d;
import e1, * as e2 from "./t1";
e1;
e2.default;
import f1, { default as f2 } from "./t1";
f1;
f2;
import "./t1";

//// [t3.ts]
import a = require("./t1");
a.default;
import b from "./t1";
b;
import * as c from "./t1";
c.default;
import { default as d } from "./t1";
d;
import e1, * as e2 from "./t1";
e1;
e2.default;
import f1, { default as f2 } from "./t1";
f1;
f2;
export { a, b, c, d, e1, e2, f1, f2 };


//// [t1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "hello";
//// [t3.js]
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
exports.f2 = exports.f1 = exports.e2 = exports.e1 = exports.d = exports.c = exports.b = exports.a = void 0;
const a = require("./t1");
exports.a = a;
a.default;
const t1_1 = __importDefault(require("./t1"));
exports.b = t1_1.default;
t1_1.default;
const c = __importStar(require("./t1"));
exports.c = c;
c.default;
const t1_2 = __importDefault(require("./t1"));
Object.defineProperty(exports, "d", { enumerable: true, get: function () { return t1_2.default; } });
t1_2.default;
const t1_3 = __importStar(require("./t1")), e2 = t1_3;
exports.e1 = t1_3.default;
exports.e2 = e2;
t1_3.default;
e2.default;
const t1_4 = __importDefault(require("./t1"));
exports.f1 = t1_4.default;
Object.defineProperty(exports, "f2", { enumerable: true, get: function () { return t1_4.default; } });
t1_4.default;
t1_4.default;
