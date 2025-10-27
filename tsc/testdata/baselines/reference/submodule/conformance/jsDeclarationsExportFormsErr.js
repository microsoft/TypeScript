//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportFormsErr.ts] ////

//// [cls.js]
export class Foo {}

//// [bar.js]
import ns = require("./cls");
export = ns; // TS Only

//// [bin.js]
import * as ns from "./cls";
module.exports = ns; // We refuse to bind cjs module exports assignments in the same file we find an import in

//// [globalNs.js]
export * from "./cls";
export as namespace GLO; // TS Only

//// [includeAll.js]
import "./bar";
import "./bin";
import "./globalNs";


//// [cls.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
}
exports.Foo = Foo;
//// [bar.js]
"use strict";
const ns = require("./cls");
module.exports = ns;
//// [bin.js]
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
const ns = __importStar(require("./cls"));
export = ns;
module.exports = ns; // We refuse to bind cjs module exports assignments in the same file we find an import in
//// [globalNs.js]
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./cls"), exports);
//// [includeAll.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./bar");
require("./bin");
require("./globalNs");


//// [cls.d.ts]
export declare class Foo {
}
//// [bar.d.ts]
import ns = require("./cls");
export = ns;
//// [bin.d.ts]
export = ns;
//// [globalNs.d.ts]
export * from "./cls";
export as namespace GLO;
//// [includeAll.d.ts]
import "./bar";
import "./bin";
import "./globalNs";
