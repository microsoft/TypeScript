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
