//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_externalModule.ts] ////

//// [index.ios.js]
"use strict";
exports.__esModule = true;
function ios() {}
exports.ios = ios;
//// [index.ios.d.ts]
export declare function ios(): void;
//// [index.js]
"use strict";
exports.__esModule = true;
function base() {}
exports.base = base;
//// [index.d.ts]
export declare function base(): void;

//// [index.ts]
import { ios } from "some-library";


//// [/bin/node_modules/some-library/index.ios.js]
"use strict";
exports.__esModule = true;
function ios() { }
exports.ios = ios;
//// [/bin/node_modules/some-library/index.js]
"use strict";
exports.__esModule = true;
function base() { }
exports.base = base;
//// [/bin/index.js]
"use strict";
exports.__esModule = true;
