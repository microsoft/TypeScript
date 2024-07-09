//// [tests/cases/compiler/strictModeWordInImportDeclaration.ts] ////

//// [strictModeWordInImportDeclaration.ts]
"use strict"
import * as package from "./1"
import {foo as private} from "./1"
import public from "./1"

//// [strictModeWordInImportDeclaration.js]
"use strict";
export {};
