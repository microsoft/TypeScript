/// <reference path="fourslash.ts" />

//// 
//// module /*check*/Mod{
//// }
//// 
//// interface MyInterface {
////     /*insert*/
//// }

edit.disableFormatting();
diagnostics.setEditValidation(IncrementalEditValidation.SyntacticOnly);

goTo.marker('check');
verify.quickInfoSymbolNameIs('Mod');

goTo.marker('insert');
edit.insert("x: number;\n");

goTo.marker('check');
verify.quickInfoSymbolNameIs('Mod');
