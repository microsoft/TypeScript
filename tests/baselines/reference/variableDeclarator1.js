//// [tests/cases/compiler/variableDeclarator1.ts] ////

//// [variableDeclarator1.ts]
var a = function () {
        var c = 1;
        return c;
    };

//// [variableDeclarator1.js]
var a = function () {
    var c = 1;
    return c;
};
