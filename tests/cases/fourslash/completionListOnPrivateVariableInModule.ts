/// <reference path='fourslash.ts'/>

//// module Foo {     var testing = "";     test/**/ }

goTo.marker();
verify.completionListContains('testing', 'var testing: string');
