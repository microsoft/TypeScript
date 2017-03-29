//// [tests/cases/compiler/es6ImportWithoutFromClause.ts] ////

//// [es6ImportWithoutFromClause_0.ts]
export var a = 10;

//// [es6ImportWithoutFromClause_1.ts]
import "es6ImportWithoutFromClause_0";


//// [es6ImportWithoutFromClause_0.js]
export var a = 10;
//// [es6ImportWithoutFromClause_1.js]
import "es6ImportWithoutFromClause_0";


//// [es6ImportWithoutFromClause_0.d.ts]
export declare var a: number;
//// [es6ImportWithoutFromClause_1.d.ts]
import "es6ImportWithoutFromClause_0";
