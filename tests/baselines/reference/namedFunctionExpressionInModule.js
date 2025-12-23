//// [tests/cases/compiler/namedFunctionExpressionInModule.ts] ////

//// [namedFunctionExpressionInModule.ts]
namespace Variables{
    var x = function bar(a, b, c) {
    }
    x(1, 2, 3);
}


//// [namedFunctionExpressionInModule.js]
var Variables;
(function (Variables) {
    var x = function bar(a, b, c) {
    };
    x(1, 2, 3);
})(Variables || (Variables = {}));
