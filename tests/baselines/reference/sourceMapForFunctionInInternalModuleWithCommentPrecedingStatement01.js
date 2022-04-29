//// [sourceMapForFunctionInInternalModuleWithCommentPrecedingStatement01.ts]
module Q {
    function P() {
        // Test this
        var a = 1;
    }
}

//// [sourceMapForFunctionInInternalModuleWithCommentPrecedingStatement01.js]
var Q;
(function (Q) {
    function P() {
        // Test this
        var a = 1;
    }
})(Q || (Q = {}));
//# sourceMappingURL=sourceMapForFunctionInInternalModuleWithCommentPrecedingStatement01.js.map