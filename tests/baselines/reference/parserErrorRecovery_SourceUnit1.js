//// [parserErrorRecovery_SourceUnit1.ts]
class C {
}
}
class D {
}

//// [parserErrorRecovery_SourceUnit1.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function () {
    function D() {
    }
    return D;
}());
