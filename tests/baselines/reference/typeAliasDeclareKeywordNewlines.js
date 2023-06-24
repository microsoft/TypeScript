//// [tests/cases/compiler/typeAliasDeclareKeywordNewlines.ts] ////

//// [typeAliasDeclareKeywordNewlines.ts]
var declare, type, T;

declare type /*unexpected newline*/
T1 = null;

declare /*ASI*/
type /*ASI*/
T = null;

declare /*ASI*/
type T2 = null;


//// [typeAliasDeclareKeywordNewlines.js]
var declare, type, T;
declare; /*ASI*/
type; /*ASI*/
T = null;
declare; /*ASI*/
