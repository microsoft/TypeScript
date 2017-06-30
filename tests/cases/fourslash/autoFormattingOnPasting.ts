/// <reference path='fourslash.ts' />

////module TestModule {
/////**/
////}
goTo.marker("");
edit.paste(` class TestClass{
private   foo;
public testMethod( )
{}
}`);
// We're missing scenarios of formatting option settings due to bug 693273 - [TypeScript] Need to improve fourslash support for formatting options.
// Missing scenario ** Uncheck Tools->Options->Text Editor->TypeScript->Formatting->General->Format on paste **
//verify.currentFileContentIs("module TestModule {\r\n\
// class TestClass{\r\n\
//private   foo;\r\n\
//public testMethod( )\r\n\
//{}\r\n\
//}\r\n\
//}");
// Missing scenario ** Check Tools->Options->Text Editor->TypeScript->Formatting->General->Format on paste **
verify.currentFileContentIs(`module TestModule {
    class TestClass {
        private foo;
        public testMethod() { }
    }
}`);