//// [tests/cases/compiler/systemObjectShorthandRename.ts] ////

//// [x.ts]
export const x = 'X'
//// [index.ts]
import {x} from './x.js'

const x2 = {x}
const a = {x2}

const x3 = x
const b = {x3}

//// [x.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 'X';
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x_js_1 = require("./x.js");
const x2 = { x: x_js_1.x };
const a = { x2 };
const x3 = x_js_1.x;
const b = { x3 };
