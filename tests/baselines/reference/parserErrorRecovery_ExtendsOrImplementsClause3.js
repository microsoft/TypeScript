//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ExtendsOrImplementsClauses/parserErrorRecovery_ExtendsOrImplementsClause3.ts] ////

//// [parserErrorRecovery_ExtendsOrImplementsClause3.ts]
class C extends implements A {
}

//// [parserErrorRecovery_ExtendsOrImplementsClause3.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
