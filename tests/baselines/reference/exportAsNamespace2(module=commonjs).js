//// [tests/cases/conformance/es2020/modules/exportAsNamespace2.ts] ////

//// [0.ts]
export const a = 1;
export const b = 2;

//// [1.ts]
export * as ns from './0';
ns.a;
ns.b;

//// [2.ts]
import * as foo from './1'

foo.ns.a;
foo.ns.b;

//// [0.js]
"use strict";
exports.__esModule = true;
exports.a = 1;
exports.b = 2;
//// [1.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) b(k);
    result["default"] = mod;
    return result;
    function b(p) {
        if (Object.hasOwnProperty.call(mod, p))
            Object.create
                ? Object.defineProperty(result, p, {
                      enumerable: true,
                      get: function() {
                          return mod[p];
                      }
                  })
                : (result[p] = mod[p]);
    }
};
exports.__esModule = true;
exports.ns = __importStar(require("./0"));
ns.a;
ns.b;
//// [2.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) b(k);
    result["default"] = mod;
    return result;
    function b(p) {
        if (Object.hasOwnProperty.call(mod, p))
            Object.create
                ? Object.defineProperty(result, p, {
                      enumerable: true,
                      get: function() {
                          return mod[p];
                      }
                  })
                : (result[p] = mod[p]);
    }
};
exports.__esModule = true;
var foo = __importStar(require("./1"));
foo.ns.a;
foo.ns.b;


//// [0.d.ts]
export declare const a = 1;
export declare const b = 2;
//// [1.d.ts]
export * as ns from './0';
//// [2.d.ts]
export {};
