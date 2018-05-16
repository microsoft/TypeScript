/// <reference path='fourslash.ts' />

////class ImplicitConstructor {
////}
////var implicitConstructor = new ImplicitConstructor(/**/);

verify.signatureHelp({
    marker: "",
    text: "ImplicitConstructor(): ImplicitConstructor",
    parameterCount: 0,
});
