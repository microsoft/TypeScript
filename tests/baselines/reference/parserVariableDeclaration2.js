//// [tests/cases/conformance/parser/ecmascript5/VariableDeclarations/parserVariableDeclaration2.ts] ////

//// [parserVariableDeclaration2.ts]
(function() {
        var check = function () {
        }

        var checkNot = function () {
        }

        MUnit.test(a);
})();

//// [parserVariableDeclaration2.js]
(function () {
    var check = function () {
    };
    var checkNot = function () {
    };
    MUnit.test(a);
})();
