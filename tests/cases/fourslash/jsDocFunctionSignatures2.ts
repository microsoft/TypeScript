///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js

//// /** @type {function(string, boolean=): number} */
//// var f6;
//// 
//// f6('', /**/false)

goTo.marker();
verify.currentSignatureHelpIs('f6(p0: string, p1?: boolean): number')
