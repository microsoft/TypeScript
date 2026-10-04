//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ObjectLiterals/parserErrorRecovery_ObjectLiteral5.ts] ////

//// [parserErrorRecovery_ObjectLiteral5.ts]
var v = { a: 1,
return;

//// [parserErrorRecovery_ObjectLiteral5.js]
"use strict";
var v = { a: 1,
    return: , };
