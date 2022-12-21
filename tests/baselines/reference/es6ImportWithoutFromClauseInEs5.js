//// [tests/cases/compiler/es6ImportWithoutFromClauseInEs5.ts] ////

//// [es6ImportWithoutFromClauseInEs5_0.ts]
export var a = 10;

//// [es6ImportWithoutFromClauseInEs5_1.ts]
import "es6ImportWithoutFromClauseInEs5_0";

//// [es6ImportWithoutFromClauseInEs5_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
//// [es6ImportWithoutFromClauseInEs5_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("es6ImportWithoutFromClauseInEs5_0");


//// [es6ImportWithoutFromClauseInEs5_0.d.ts]
export declare var a: number;
//// [es6ImportWithoutFromClauseInEs5_1.d.ts]
import "es6ImportWithoutFromClauseInEs5_0";
