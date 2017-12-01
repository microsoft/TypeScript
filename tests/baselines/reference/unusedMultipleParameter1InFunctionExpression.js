//// [unusedMultipleParameter1InFunctionExpression.ts]
var func = function(person: string, person2: string) {
    var unused = 20;
    person2 = "Dummy value";
}

//// [unusedMultipleParameter1InFunctionExpression.js]
var func = function (person, person2) {
    var unused = 20;
    person2 = "Dummy value";
};
