/// <reference path="fourslash.ts" />

// @allowJs: true
// @target: esnext

// @Filename: test.js
//// (typeof foo !== "undefined"
////   ? foo
////   : {}
//// )./**/;

// @Filename: someLib.d.ts
//// declare var foo: typeof globalThis;

goTo.marker();
verify.completions({
    marker: ""
});
