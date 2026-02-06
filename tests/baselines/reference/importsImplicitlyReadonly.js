//// [tests/cases/conformance/externalModules/importsImplicitlyReadonly.ts] ////

//// [a.ts]
export var x = 1;
var y = 1;
export { y };

//// [b.ts]
import { x, y } from "./a";
import * as a1 from "./a";
import a2 = require("./a");
const a3 = a1;

x = 1;     // Error
y = 1;     // Error
a1.x = 1;  // Error
a1.y = 1;  // Error
a2.x = 1;
a2.y = 1;
a3.x = 1;
a3.y = 1;

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.x = 1;
var y = 1;
exports.y = y;
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
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
const a1 = __importStar(require("./a"));
const a2 = require("./a");
const a3 = a1;
a_1.x = 1; // Error
a_1.y = 1; // Error
a1.x = 1; // Error
a1.y = 1; // Error
a2.x = 1;
a2.y = 1;
a3.x = 1;
a3.y = 1;
