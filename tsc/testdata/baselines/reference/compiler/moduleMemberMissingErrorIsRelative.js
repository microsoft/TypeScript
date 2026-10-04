//// [tests/cases/compiler/moduleMemberMissingErrorIsRelative.ts] ////

//// [foo.ts]
export {};
//// [bar.ts]
import {nosuch} from './foo';

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
