/// <reference path="fourslash.ts" />

//// 
//// namespace /*check*/Mod{
//// }
//// 
//// interface MyInterface {
////     /*insert*/
//// }

edit.disableFormatting();

verify.quickInfoAt("check", "namespace Mod");

goTo.marker('insert');
edit.insert("x: number;\n");

verify.quickInfoAt("check", "namespace Mod");
