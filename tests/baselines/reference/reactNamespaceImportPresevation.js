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
Object.defineProperty(exports, "__esModule", { value: true });
var myReactLib = require("my-React-Lib"); // should not be elided
<foo data/>;
