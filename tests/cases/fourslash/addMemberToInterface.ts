/// <reference path="fourslash.ts" />

//// 
//// namespace /*check*/Mod{
//// }
//// 
//// interface MyInterface {
////     /*insert*/
//// }

edit.disableFormatting();

goTo.marker('check');
verify.quickInfoIs('namespace Mod');

goTo.marker('insert');
edit.insert("x: number;\n");

goTo.marker('check');
verify.quickInfoIs('namespace Mod');
