//// [tests/cases/compiler/functionTypesLackingReturnTypes.ts] ////

//// [functionTypesLackingReturnTypes.ts]
// Error (no '=>')
function f(x: ()) {
}

// Error (no '=>')
var g: (param);

// Okay
var h: { () }

// Okay
var i: { new () }

//// [functionTypesLackingReturnTypes.js]
function f(x) {
}
var g;
var h;
var i;
