//// [tests/cases/compiler/deprecatedCompilerOptionsBaseUrlIgnored.ts] ////

//// [module.ts]
export const value = 42;

//// [main.ts]
import { value } from "@app/module";
const result = value;

//// [module.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.value = void 0;
exports.value = 42;
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require("@app/module");
var result = module_1.value;
