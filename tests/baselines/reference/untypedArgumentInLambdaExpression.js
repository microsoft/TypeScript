//// [tests/cases/compiler/untypedArgumentInLambdaExpression.ts] ////

//// [untypedArgumentInLambdaExpression.ts]
declare function f(fn: (a: string) => string);
 
f((input): string => {
    return "." + input;
});
 

//// [untypedArgumentInLambdaExpression.js]
"use strict";
f((input) => {
    return "." + input;
});
