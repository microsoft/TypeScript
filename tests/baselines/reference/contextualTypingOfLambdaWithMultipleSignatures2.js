//// [tests/cases/compiler/contextualTypingOfLambdaWithMultipleSignatures2.ts] ////

//// [contextualTypingOfLambdaWithMultipleSignatures2.ts]
var f: {
    (x: string): string;
    (x: number): string
};

f = (a) => { return a.asdf }

//// [contextualTypingOfLambdaWithMultipleSignatures2.js]
"use strict";
var f;
f = function (a) { return a.asdf; };
