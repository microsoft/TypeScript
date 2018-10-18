//// [letInConstDeclarations_ES6.ts]
// All use of let in const declaration should be an error
const x = 50, let = 5;

{
    const x = 10, let = 20;
}

//// [letInConstDeclarations_ES6.js]
// All use of let in const declaration should be an error
const x = 50, let = 5;
{
    const x = 10, let = 20;
}
