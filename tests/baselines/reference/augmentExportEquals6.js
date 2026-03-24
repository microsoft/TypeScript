//// [tests/cases/compiler/augmentExportEquals6.ts] ////

//// [file1.ts]
class foo {}
namespace foo {
    export class A {}
    export namespace B { export let a; }
}
export = foo;

//// [file2.ts]
import x = require("./file1"); 
x.B.b = 1;

// OK - './file1' is a namespace
declare module "./file1" {
    interface A { a: number }
    namespace B {
        export let b: number;
    }
}

//// [file3.ts]
import * as x from "./file1";
import "./file2";
let a: x.A;
let b = a.a;
let c = x.B.b;

//// [file1.js]
"use strict";
class foo {
}
(function (foo) {
    class A {
    }
    foo.A = A;
    let B;
    (function (B) {
    })(B = foo.B || (foo.B = {}));
})(foo || (foo = {}));
module.exports = foo;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x = require("./file1");
x.B.b = 1;
//// [file3.js]
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
const x = __importStar(require("./file1"));
require("./file2");
let a;
let b = a.a;
let c = x.B.b;
