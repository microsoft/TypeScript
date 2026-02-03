//// [tests/cases/compiler/augmentExportEquals3_1.ts] ////

//// [file1.d.ts]
declare module "file1" {
    function foo(): void;
    namespace foo {
        export var v: number;
    }
    export = foo;
}


//// [file2.ts]
/// <reference path="file1.d.ts"/>
import x = require("file1"); 
x.b = 1;

// OK - './file1' is a namespace
declare module "file1" {
    interface A { a }
    let b: number;
}

//// [file3.ts]
import * as x from "file1";
import "file2";
let a: x.A;
let b = x.b;

//// [file2.js]
define(["require", "exports", "file1"], function (require, exports, x) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    x.b = 1;
});
//// [file3.js]
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
define(["require", "exports", "file1", "file2"], function (require, exports, x) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    x = __importStar(x);
    var a;
    var b = x.b;
});
