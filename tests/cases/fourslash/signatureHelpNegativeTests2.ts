/// <reference path='fourslash.ts'/>

////class clsOverload { constructor(); constructor(test: string); constructor(test?: string) { } }
////var x = new clsOverload/*beforeOpenParen*/()/*afterOpenParen*/;

goTo.marker('beforeOpenParen');
verify.not.signatureHelpPresent();

goTo.marker('afterOpenParen');
verify.not.signatureHelpPresent();