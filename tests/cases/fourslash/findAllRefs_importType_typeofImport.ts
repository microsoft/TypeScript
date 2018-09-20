/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export const x = 0;

// @Filename: /b.ts
////const x: typeof import("[|./a|]") = { x: 0 };
////const y: typeof import("[|./a|]") = { x: 0 };

verify.singleReferenceGroup('module "/a"');
