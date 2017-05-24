//// [unusedSingleParameterInFunctionExpression.ts]
var func = function(person: string) {
    var unused = 20;
}

//// [unusedSingleParameterInFunctionExpression.js]
var func = function func(person) {
    var unused = 20;
};
