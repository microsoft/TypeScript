///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js

//// /** @type {function(string, boolean=): number} */
//// var f6;
////
//// f6('', /**/false)

verify.signatureHelp({ marker: "", text: "f6(arg0: string, arg1?: boolean): number" });
