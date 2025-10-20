//// [tests/cases/compiler/resolutionCandidateFromPackageJsonField2.ts] ////

//// [bar.ts]
export const a = 1234;

//// [main.d.ts]
export const b: string;

//// [test.ts]
import { a } from "foo/bar.ts";
import { b } from "baz/main.ts";


//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1234;
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
