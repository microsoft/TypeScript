//// [tests/cases/compiler/commonjsShorthandDestructuringDefaultImportExport.ts] ////

//// [a.ts]
import { imported } from "./b";
export const exported = 2;
let a, b;
({ a = imported, b = exported } = {});

//// [b.ts]
export const imported = 1;


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imported = void 0;
exports.imported = 1;
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exported = void 0;
const b_1 = require("./b");
exports.exported = 2;
let a, b;
({ a = b_1.imported, b = exports.exported } = {});
