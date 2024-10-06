//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit6.ts] ////

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
//// [import.d.ts]
export {};
declare global {
    interface ImportInterface {}
    function getInterI(): ImportInterface;
}
//// [require.d.ts]
export {};
declare global {
    interface RequireInterface {}
    function getInterR(): RequireInterface;
}
//// [uses.ts]
/// <reference types="pkg" preserve="true" />
export default getInterR();
//// [index.ts]
import obj from "./uses.js"
export default (obj as typeof obj);

//// [uses.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg" preserve="true" />
exports.default = getInterR();
//// [index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uses_js_1 = __importDefault(require("./uses.js"));
exports.default = uses_js_1.default;


//// [uses.d.ts]
/// <reference types="pkg" preserve="true" />
declare const _default: RequireInterface;
export default _default;
//// [index.d.ts]
import obj from "./uses.js";
declare const _default: typeof obj;
export default _default;
