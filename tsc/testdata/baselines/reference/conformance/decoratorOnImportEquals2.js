//// [tests/cases/conformance/decorators/invalid/decoratorOnImportEquals2.ts] ////

//// [decoratorOnImportEquals2_0.ts]
export var X;

//// [decoratorOnImportEquals2_1.ts]
@dec
import lib = require('./decoratorOnImportEquals2_0');

declare function dec<T>(target: T): T;

//// [decoratorOnImportEquals2_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = void 0;
//// [decoratorOnImportEquals2_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
