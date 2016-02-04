//// [undefinedInferentialTyping.ts]
function f<T>(arr: T[], element: T): T {
    return null;
}

var a = f([], 3); // should be number

//// [undefinedInferentialTyping.js]
function f(arr, element) {
    return null;
}
var a = f([], 3); // should be number
