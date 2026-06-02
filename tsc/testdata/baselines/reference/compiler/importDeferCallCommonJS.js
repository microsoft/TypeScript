//// [tests/cases/compiler/importDeferCallCommonJS.ts] ////

//// [a.ts]
export {};

//// [main.ts]
export {};
import.defer("./a");


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import.defer("./a");
