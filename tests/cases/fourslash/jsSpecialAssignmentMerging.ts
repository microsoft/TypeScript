/// <reference path="fourslash.ts" />
// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: b.d.ts
//// declare class C { }
// @Filename: a.js
//// C.prototype = { m: "q"; }
// @Filename: test.js
//// var c = new C()
//// /*1*/
//// var c = new C()

// #24015
// This failed with 13 and up on my machine, so 20 is 2**7 more than needed.
for (let i = 0; i < 20; i++) {
    goTo.marker('1');
    edit.insertLine('c');

    verify.getSemanticDiagnostics([])
}
