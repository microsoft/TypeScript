//// [tests/cases/compiler/exportStarFromEmptyModule.ts] ////

//// [exportStarFromEmptyModule_module1.ts]
export class A {
    static r;
}

//// [exportStarFromEmptyModule_module2.ts]
// empty

//// [exportStarFromEmptyModule_module3.ts]
export * from "./exportStarFromEmptyModule_module2";
export * from "./exportStarFromEmptyModule_module1";

export class A {
    static q;
}

//// [exportStarFromEmptyModule_module4.ts]
import * as X from "./exportStarFromEmptyModule_module3";
var s: X.A;
X.A.q;
X.A.r; // Error

//// [exportStarFromEmptyModule_module1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
    static r;
}
exports.A = A;
//// [exportStarFromEmptyModule_module2.js]
// empty
//// [exportStarFromEmptyModule_module3.js]
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
exports.A = void 0;
__exportStar(require("./exportStarFromEmptyModule_module2"), exports);
__exportStar(require("./exportStarFromEmptyModule_module1"), exports);
class A {
    static q;
}
exports.A = A;
//// [exportStarFromEmptyModule_module4.js]
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
const X = __importStar(require("./exportStarFromEmptyModule_module3"));
var s;
X.A.q;
X.A.r; // Error


//// [exportStarFromEmptyModule_module1.d.ts]
export declare class A {
    static r: any;
}
//// [exportStarFromEmptyModule_module2.d.ts]
//// [exportStarFromEmptyModule_module3.d.ts]
export * from "./exportStarFromEmptyModule_module2";
export * from "./exportStarFromEmptyModule_module1";
export declare class A {
    static q: any;
}
//// [exportStarFromEmptyModule_module4.d.ts]
export {};
