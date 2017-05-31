//// [unusedMultipleParameter2InFunctionExpression.ts]
var func = function(person: string, person2: string, person3: string) {
    var unused = 20;
    person2 = "Dummy value";
}

//// [unusedMultipleParameter2InFunctionExpression.js]
var func = function func(person, person2, person3) {
    var unused = 20;
    person2 = "Dummy value";
};
