//// [tests/cases/compiler/useBeforeDeclaration_destructuring.ts] ////

//// [useBeforeDeclaration_destructuring.ts]
a;
let {a, b = a} = {a: '', b: 1};
b;

function test({c, d = c}: Record<string, number>) {}


//// [useBeforeDeclaration_destructuring.js]
a;
let { a, b = a } = { a: '', b: 1 };
b;
function test({ c, d = c }) { }
