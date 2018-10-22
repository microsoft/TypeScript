//// [tests/cases/compiler/moduleMemberMissingErrorIsRelative.ts] ////

//// [foo.ts]
export {};
//// [bar.ts]
import {nosuch} from './foo';

//// [foo.js]
"use strict";
exports.__esModule = true;
//// [bar.js]
"use strict";
exports.__esModule = true;
