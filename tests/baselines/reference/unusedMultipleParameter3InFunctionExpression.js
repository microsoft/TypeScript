//// [unusedMultipleParameter3InFunctionExpression.ts]

var func = function(person: string, person2: string, person3: string) {
    var unused = 20;
    person2 = "Dummy value";
}

//// [unusedMultipleParameter3InFunctionExpression.js]
var func = function (person, person2, person3) {
    var unused = 20;
    person2 = "Dummy value";
};
