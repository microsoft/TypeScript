
// Error (no '=>')
function f(x: ()) {
}

// Error (no '=>')
var g: (param);

// Okay
var h: { () }

// Okay
var i: { new () }