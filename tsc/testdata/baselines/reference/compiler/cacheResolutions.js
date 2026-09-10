//// [tests/cases/compiler/cacheResolutions.ts] ////

//// [app.ts]
export let x = 1;

//// [lib1.ts]
export let x = 1;

//// [lib2.ts]
export let x = 1;

//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
//// [lib1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
//// [lib2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
