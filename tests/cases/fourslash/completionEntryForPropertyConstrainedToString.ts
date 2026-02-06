/// <reference path="fourslash.ts" />

//// declare function test<P extends "a" | "b">(p: { type: P }): void;
////
//// test({ type: /*ts*/ })

verify.completions({ marker: ["ts"], includes: ['"a"', '"b"'], isNewIdentifierLocation: false, defaultCommitCharacters: [".", ",", ";"] });
