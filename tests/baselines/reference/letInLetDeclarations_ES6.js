//// [tests/cases/compiler/letInLetDeclarations_ES6.ts] ////

//// [letInLetDeclarations_ES6.ts]
// All use of let in const declaration should be an error
let x = 50, let = 5;

{
    let x = 10, let = 20;
}

//// [letInLetDeclarations_ES6.js]
// All use of let in const declaration should be an error
let x = 50, let = 5;
{
    let x = 10, let = 20;
}
