//// [tests/cases/compiler/unusedSingleParameterInFunctionExpression.ts] ////

//// [unusedSingleParameterInFunctionExpression.ts]
var func = function(person: string) {
    var unused = 20;
}

//// [unusedSingleParameterInFunctionExpression.js]
var func = function (person) {
    var unused = 20;
};
