//// [tests/cases/compiler/letInConstDeclarations_ES5.ts] ////

//// [letInConstDeclarations_ES5.ts]
// All use of let in const declaration should be an error
const x = 50, let = 5;

{
    const x = 10, let = 20;
}

//// [letInConstDeclarations_ES5.js]
// All use of let in const declaration should be an error
var x = 50, let = 5;
{
    var x_1 = 10, let_1 = 20;
}
