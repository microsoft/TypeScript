/// <reference path="fourslash.ts" />

//// declare function test<P extends "a" | "b">(p: P): void;
////
//// test(/*ts*/)
////

verify.completions({ marker: ["ts"], includes: ['"a"', '"b"'], isNewIdentifierLocation: true });
