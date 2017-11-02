//// [tests/cases/compiler/reactNamespaceImportPresevation.tsx] ////

//// [modules.d.ts]
declare module "my-React-Lib" {
    var a: any;
    export = a;
}

//// [test.tsx]
import * as myReactLib from "my-React-Lib"; // should not be elided
declare var foo: any;

<foo data/>;


//// [test.jsx]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var myReactLib = __importStar(require("my-React-Lib")); // should not be elided
<foo data/>;
