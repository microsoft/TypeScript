//// [tests/cases/compiler/jsdocLinkImportElisionQueryOrder.ts] ////

//// [a.ts]
export interface A {}

//// [b.ts]
import * as a from "./a";

/**
 * See {@link a.A}.
 */
export function foo() {}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.foo = foo;
const a = __importStar(require("./a"));
/**
 * See {@link a.A}.
 */
function foo() { }


!!!! File /b.js differs from original emit in noCheck emit
//// [b.js]
--- Expected	The full check baseline
+++ Actual	with noCheck set
@@ -1,40 +1,6 @@
 "use strict";
-var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
-    if (k2 === undefined) k2 = k;
-    var desc = Object.getOwnPropertyDescriptor(m, k);
-    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
-      desc = { enumerable: true, get: function() { return m[k]; } };
-    }
-    Object.defineProperty(o, k2, desc);
-}) : (function(o, m, k, k2) {
-    if (k2 === undefined) k2 = k;
-    o[k2] = m[k];
-}));
-var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
-    Object.defineProperty(o, "default", { enumerable: true, value: v });
-}) : function(o, v) {
-    o["default"] = v;
-});
-var __importStar = (this && this.__importStar) || (function () {
-    var ownKeys = function(o) {
-        ownKeys = Object.getOwnPropertyNames || function (o) {
-            var ar = [];
-            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
-            return ar;
-        };
-        return ownKeys(o);
-    };
-    return function (mod) {
-        if (mod && mod.__esModule) return mod;
-        var result = {};
-        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
-        __setModuleDefault(result, mod);
-        return result;
-    };
-})();
 Object.defineProperty(exports, "__esModule", { value: true });
 exports.foo = foo;
-const a = __importStar(require("./a"));
 /**
  * See {@link a.A}.
  */