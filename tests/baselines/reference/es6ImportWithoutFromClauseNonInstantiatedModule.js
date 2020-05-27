//// [tests/cases/compiler/es6ImportWithoutFromClauseNonInstantiatedModule.ts] ////

//// [es6ImportWithoutFromClauseNonInstantiatedModule_0.ts]
export interface i {
}

//// [es6ImportWithoutFromClauseNonInstantiatedModule_1.ts]
import "es6ImportWithoutFromClauseNonInstantiatedModule_0";

//// [es6ImportWithoutFromClauseNonInstantiatedModule_0.js]
export {};
//// [es6ImportWithoutFromClauseNonInstantiatedModule_1.js]
import "es6ImportWithoutFromClauseNonInstantiatedModule_0";


//// [es6ImportWithoutFromClauseNonInstantiatedModule_0.d.ts]
export interface i {
}
//// [es6ImportWithoutFromClauseNonInstantiatedModule_1.d.ts]
import "es6ImportWithoutFromClauseNonInstantiatedModule_0";
