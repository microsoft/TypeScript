//// [tests/cases/compiler/constDeclarations-scopes2.ts] ////

//// [constDeclarations-scopes2.ts]
// global
const c = "string";

var n: number;
var b: boolean;

// for scope
for (const c = 0; c < 10; n = c ) {
    // for block
    const c = false;
    b = c;
}



//// [constDeclarations-scopes2.js]
// global
const c = "string";
var n;
var b;
// for scope
for (const c = 0; c < 10; n = c) {
    // for block
    const c = false;
    b = c;
}
