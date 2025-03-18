//// [tests/cases/conformance/constEnums/constEnumPropertyAccess2.ts] ////

//// [constEnumPropertyAccess2.ts]
// constant enum declarations are completely erased in the emitted JavaScript code.
// it is an error to reference a constant enum object in any other context
// than a property access that selects one of the enum's members

const enum G {
    A = 1,
    B = 2,
    C = A + B,
    D = A * 2
}

// Error from referring constant enum in any other context than a property access
var z = G;
var z1 = G[G.A];
var g: G;
g = "string";
function foo(x: G) { }
G.B = 3;


//// [constEnumPropertyAccess2.js]
var G;
(function (G) {
    G[G["A"] = 1] = "A";
    G[G["B"] = 2] = "B";
    G[G["C"] = 3] = "C";
    G[G["D"] = 2] = "D";
})(G || (G = {}));
var z = G;
var z1 = G[G.A];
var g;
g = "string";
function foo(x) { }
G.B = 3;
