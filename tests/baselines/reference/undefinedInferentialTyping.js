//// [tests/cases/compiler/undefinedInferentialTyping.ts] ////

//// [undefinedInferentialTyping.ts]
function f<T>(arr: T[], elemnt: T): T {
    return null;
}

var a = f([], 3); // should be number

//// [undefinedInferentialTyping.js]
function f(arr, elemnt) {
    return null;
}
var a = f([], 3); // should be number
