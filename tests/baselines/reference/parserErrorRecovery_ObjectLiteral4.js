//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ObjectLiterals/parserErrorRecovery_ObjectLiteral4.ts] ////

//// [parserErrorRecovery_ObjectLiteral4.ts]
var v = { a: 1
return;

//// [parserErrorRecovery_ObjectLiteral4.js]
var v = { a: 1,
    return:  };
