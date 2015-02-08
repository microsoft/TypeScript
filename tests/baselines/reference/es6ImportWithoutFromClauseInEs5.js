//// [tests/cases/compiler/es6ImportWithoutFromClauseInEs5.ts] ////

//// [es6ImportWithoutFromClauseInEs5_0.ts]

export var a = 10;

//// [es6ImportWithoutFromClauseInEs5_1.ts]
import "es6ImportWithoutFromClauseInEs5_0";

//// [es6ImportWithoutFromClauseInEs5_0.js]
exports.a = 10;
//// [es6ImportWithoutFromClauseInEs5_1.js]
require("es6ImportWithoutFromClauseInEs5_0");
