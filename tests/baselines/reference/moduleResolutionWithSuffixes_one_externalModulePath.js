//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_externalModulePath.ts] ////

//// [foo.ios.js]
"use strict";
exports.__esModule = true;
function iosfoo() {}
exports.iosfoo = iosfoo;
//// [foo.ios.d.ts]
export declare function iosfoo(): void;
//// [foo.js]
"use strict";
exports.__esModule = true;
function basefoo() {}
exports.basefoo = basefoo;
//// [foo.d.ts]
export declare function basefoo(): void;

//// [index.ts]
import { iosfoo } from "some-library/foo";


//// [/bin/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
