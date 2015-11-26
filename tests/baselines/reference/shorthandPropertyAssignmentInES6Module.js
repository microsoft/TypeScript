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
exports.x = 1;
//// [test.js]
"use strict";
var existingModule_1 = require('./existingModule');
var missingModule_1 = require('./missingModule');
const test = { x: existingModule_1.x, foo: missingModule_1.foo };
use(existingModule_1.x);
use(missingModule_1.foo);
