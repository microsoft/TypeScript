//// [tests/cases/compiler/es6ImportWithoutFromClause.ts] ////

//// [es6ImportWithoutFromClause_0.ts]

export var a = 10;

//// [es6ImportWithoutFromClause_1.ts]
import "es6ImportWithoutFromClause_0";

//// [es6ImportWithoutFromClause_0.js]
exports.a = 10;
//// [es6ImportWithoutFromClause_1.js]
require("es6ImportWithoutFromClause_0");
