//// [sourceMapVariableWithCommentsInsideModule.ts]
module Q {
    function P() {
        // Test this
        var a = 1;
    }
}

//// [sourceMapVariableWithCommentsInsideModule.js]
var Q;
(function (Q) {
    function P() {
        // Test this
        var a = 1;
    }
})(Q || (Q = {}));
//# sourceMappingURL=sourceMapVariableWithCommentsInsideModule.js.map