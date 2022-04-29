//// [objectTypeLiteralSyntax2.ts]
var x: {
    foo: string,
    bar: string
}

// ASI makes this work
var y: {
    foo: string
    bar: string
}

var z: { foo: string bar: string }

//// [objectTypeLiteralSyntax2.js]
var x;
// ASI makes this work
var y;
var z;
