//// [tests/cases/conformance/parser/ecmascript5/MissingTokens/parserMissingToken1.ts] ////

//// [parserMissingToken1.ts]
a / finally

//// [parserMissingToken1.js]
a / ;
try { }
finally { }
