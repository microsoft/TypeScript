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
// Error (no '=>')
function f(x) {
}
// Error (no '=>')
var g;
// Okay
var h;
// Okay
var i;
