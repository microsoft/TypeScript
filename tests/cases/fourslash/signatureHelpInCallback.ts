/// <reference path='fourslash.ts' />

////declare function forEach(f: () => void);
////forEach(/*1*/() => {
////    /*2*/
////});

verify.signatureHelp({ marker: "1", text: "forEach(f: () => void): any" })
verify.noSignatureHelp("2");
