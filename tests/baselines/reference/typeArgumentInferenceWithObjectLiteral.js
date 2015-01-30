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


//// [typeArgumentInferenceWithObjectLiteral.js]
function foo(x) {
}
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
