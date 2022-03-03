//// [tests/cases/compiler/shorthandPropertyAssignmentInES6Module.ts] ////

//// [existingModule.ts]
export var x = 1;

//// [test.ts]
import {x} from './existingModule';
import {foo} from './missingModule';

declare function use(a: any): void;

const test = { x, foo };

use(x);
use(foo);

//// [existingModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const existingModule_1 = require("./existingModule");
const missingModule_1 = require("./missingModule");
const test = { x: existingModule_1.x, foo: missingModule_1.foo };
use(existingModule_1.x);
use(missingModule_1.foo);
