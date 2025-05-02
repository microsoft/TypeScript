//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ObjectLiterals/parserErrorRecovery_ObjectLiteral2.ts] ////

//// [parserErrorRecovery_ObjectLiteral2.ts]
var v = { a
return;

//// [parserErrorRecovery_ObjectLiteral2.js]
var v = { a: a, return:  };
