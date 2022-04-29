/// <reference path='fourslash.ts' />

//// /**/function bar(a: A):     a        is       B    {}

goTo.marker();
format.document();
verify.currentLineContentIs("function bar(a: A): a is B { }");