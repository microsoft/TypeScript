/// <reference path='fourslash.ts' />

// @Filename: file1.ts
////[|this|]; [|this|];

// @Filename: file2.ts
////[|this|];
////[|this|];

// @Filename: file3.ts
//// ((x = [|this|], y) => [|this|])([|this|], [|this|]);
//// // different 'this'
//// function f(this) { return this; }

verify.singleReferenceGroup("this");
