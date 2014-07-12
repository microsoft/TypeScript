//// [overloadResolutionOverCTLambda.js]
function foo(b) {
}
foo(function (a) {
    return a;
}); // can not convert (number)=>bool to (number)=>number
