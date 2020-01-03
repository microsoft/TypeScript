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
    if (mod != null) for (var k in mod) b(k);
    result["default"] = mod;
    return result;
    function b(p) {
        if (Object.hasOwnProperty.call(mod, p))
            Object.create
                ? Object.defineProperty(result, p, {
                    enumerable: true,
                    get: function () {
                        return mod[p];
                    }
                })
                : (result[p] = mod[p]);
    }
};
exports.__esModule = true;
var foo = __importStar(require("./foo"));
foo["default"];
