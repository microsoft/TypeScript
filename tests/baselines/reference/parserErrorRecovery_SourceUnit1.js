//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/SourceUnits/parserErrorRecovery_SourceUnit1.ts] ////

//// [parserErrorRecovery_SourceUnit1.ts]
class C {
}
}
class D {
}

//// [parserErrorRecovery_SourceUnit1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
