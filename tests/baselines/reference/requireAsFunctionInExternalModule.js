//// [tests/cases/compiler/requireAsFunctionInExternalModule.ts] ////

//// [c.js]
export default function require(a) { }
export function has(a) { return true }

//// [m.js]
import require, { has } from "./c"
export function hello() { }
if (has('ember-debug')) {
    require('ember-debug');
}

//// [m2.ts]
import { hello } from "./m";
hello();


//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = require;
exports.has = has;
function require(a) { }
function has(a) { return true; }
//// [m.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = hello;
const c_1 = __importStar(require("./c"));
function hello() { }
if ((0, c_1.has)('ember-debug')) {
    (0, c_1.default)('ember-debug');
}
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const m_1 = require("./m");
(0, m_1.hello)();
