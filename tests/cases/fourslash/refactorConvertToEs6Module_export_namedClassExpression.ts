/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////exports.C = class E { static instance = new E(); }
////exports.D = class D { static instance = new D(); }

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`export const C = class E { static instance = new E(); }
export class D { static instance = new D(); }`,
});
