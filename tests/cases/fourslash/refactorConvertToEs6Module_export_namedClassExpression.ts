/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////exports.C = class E { static instance = new E(); }
////exports.D = class D { static instance = new D(); }

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`const _C = class E {
    static instance = new E();
};
export { _C as C };
const _D = class D {
    static instance = new D();
};
export { _D as D };`,
});
