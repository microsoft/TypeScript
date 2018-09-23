//// [sourceMapForFunctionInInternalModuleWithCommentPrecedingStatement01.ts]
module Q {
    function P() {
        // Test this
        var a = 1;
    }
}

//// [sourceMapForFunctionInInternalModuleWithCommentPrecedingStatement01.js]
var Q = Q || (Q = {});
(function (Q) {
    function P() {
        // Test this
        var a = 1;
    }
})(Q);
//# sourceMappingURL=sourceMapForFunctionInInternalModuleWithCommentPrecedingStatement01.js.map