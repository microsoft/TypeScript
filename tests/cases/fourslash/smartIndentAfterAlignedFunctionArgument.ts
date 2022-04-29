/// <reference path='fourslash.ts'/>

////function foo(bar,
////             blah, baz,
////             /**/
////) { };

goTo.marker();
// keep indentation of 'blah'
verify.indentationIs(13);
