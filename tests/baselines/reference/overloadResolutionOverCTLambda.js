//// [overloadResolutionOverCTLambda.ts]
function foo(b: (item: number) => boolean) { }
foo(a => a); // can not convert (number)=>bool to (number)=>number

//// [overloadResolutionOverCTLambda.js]
function foo(b) { }
foo(function (a) { return a; }); // can not convert (number)=>bool to (number)=>number
