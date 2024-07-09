/// <reference path='fourslash.ts' />

// @Filename: a.ts
////export class SomeClass {}

// @Filename: b.ts
////import { SomeClass } from "./a";
////[|SomeClas|]

goTo.file("b.ts")

verify.codeFixAvailable([
    { description: "Change spelling to 'SomeClass'" },
    { description: "Remove import from './a'" }
]);

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Change_spelling_to_0.message, "SomeClass"],
    newRangeContent: "SomeClass"
});