/// <reference path="fourslash.ts" />
////function foo()
////{
////    var bar;
////    /*1*/
////}
goTo.marker('1')
edit.insertLine("");
verify.currentFileContentIs(`function foo()
{
    var bar;


}`);
