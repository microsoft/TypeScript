//// [inferentialTypingWithFunctionType2.ts]
function identity<A>(a: A): A {
    return a;
}
var x = [1, 2, 3].map(identity)[0];

//// [inferentialTypingWithFunctionType2.js]
function identity(a) {
    return a;
}
var x = [1, 2, 3].map(identity)[0];
