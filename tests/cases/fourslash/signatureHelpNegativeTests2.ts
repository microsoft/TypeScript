/// <reference path='fourslash.ts'/>

////class clsOverload { constructor(); constructor(test: string); constructor(test?: string) { } }
////var x = new clsOverload/*beforeOpenParen*/()/*afterCloseParen*/;

verify.noSignatureHelp("beforeOpenParen", "afterCloseParen");
