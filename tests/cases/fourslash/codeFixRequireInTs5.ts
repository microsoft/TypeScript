/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const a = 1;
////const b = 2;
////const foo = require(`foo${a}${b}`);

verify.not.codeFixAvailable();
