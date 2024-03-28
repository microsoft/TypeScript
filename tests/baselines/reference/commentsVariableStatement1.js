//// [tests/cases/compiler/commentsVariableStatement1.ts] ////

//// [commentsVariableStatement1.ts]
/** Comment */
var v = 1;

//// [commentsVariableStatement1.js]
/** Comment */
var v = 1;


//// [commentsVariableStatement1.d.ts]
/** Comment */
declare var v: number;
