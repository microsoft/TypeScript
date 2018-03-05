//// [tests/cases/compiler/esModuleInteropImportNamespace.ts] ////

//// [foo.d.ts]
declare function foo(): void;
declare namespace foo {}
export = foo;

//// [index.ts]
import * as foo from "./foo";
foo.default;


//// [index.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var foo = __importStar(require("./foo"));
foo["default"];
