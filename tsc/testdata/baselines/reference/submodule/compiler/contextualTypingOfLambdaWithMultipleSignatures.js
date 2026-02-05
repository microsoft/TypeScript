//// [tests/cases/compiler/contextualTypingOfLambdaWithMultipleSignatures.ts] ////

//// [contextualTypingOfLambdaWithMultipleSignatures.ts]
interface Foo {
    getFoo(n: number): void;
    getFoo(s: string): void;
}

var foo: Foo;
foo.getFoo = bar => { };

//// [contextualTypingOfLambdaWithMultipleSignatures.js]
"use strict";
var foo;
foo.getFoo = bar => { };
