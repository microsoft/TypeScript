//// [tests/cases/conformance/expressions/functionCalls/typeArgumentInferenceWithObjectLiteral.ts] ////

//// [typeArgumentInferenceWithObjectLiteral.ts]
interface Computed<T> {
    read(): T;
    write(value: T);
}

function foo<T>(x: Computed<T>) { }

var s: string;

// Calls below should infer string for T and then assign that type to the value parameter
foo({
    read: () => s,
    write: value => s = value
});
foo({
    write: value => s = value,
    read: () => s
});

enum E1 { X }
enum E2 { X }

// Check that we infer from both a.r and b before fixing T in a.w

declare function f1<T, U>(a: { w: (x: T) => U; r: () => T; }, b: T): U;

var v1: number;
var v1 = f1({ w: x => x, r: () => 0 }, 0);
var v1 = f1({ w: x => x, r: () => 0 }, E1.X);
var v1 = f1({ w: x => x, r: () => E1.X }, 0);

var v2: E1;
var v2 = f1({ w: x => x, r: () => E1.X }, E1.X);

var v3 = f1({ w: x => x, r: () => E1.X }, E2.X);  // Error


//// [typeArgumentInferenceWithObjectLiteral.js]
function foo(x) { }
var s;
// Calls below should infer string for T and then assign that type to the value parameter
foo({
    read: function () { return s; },
    write: function (value) { return s = value; }
});
foo({
    write: function (value) { return s = value; },
    read: function () { return s; }
});
var E1;
(function (E1) {
    E1[E1["X"] = 0] = "X";
})(E1 || (E1 = {}));
var E2;
(function (E2) {
    E2[E2["X"] = 0] = "X";
})(E2 || (E2 = {}));
var v1;
var v1 = f1({ w: function (x) { return x; }, r: function () { return 0; } }, 0);
var v1 = f1({ w: function (x) { return x; }, r: function () { return 0; } }, E1.X);
var v1 = f1({ w: function (x) { return x; }, r: function () { return E1.X; } }, 0);
var v2;
var v2 = f1({ w: function (x) { return x; }, r: function () { return E1.X; } }, E1.X);
var v3 = f1({ w: function (x) { return x; }, r: function () { return E1.X; } }, E2.X); // Error
