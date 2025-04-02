//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ObjectLiterals/parserErrorRecovery_ObjectLiteral3.ts] ////

//// [parserErrorRecovery_ObjectLiteral3.ts]
var v = { a: 
return;

//// [parserErrorRecovery_ObjectLiteral3.js]
var v = { a: ,
    return:  };
