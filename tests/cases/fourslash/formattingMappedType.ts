/// <reference path='fourslash.ts' />

/////*generic*/type t  < T  > =   {
/////*map*/   [   P   in   keyof    T  ]   :   T  [  P  ]
////};


format.document();
goTo.marker("generic");
verify.currentLineContentIs("type t<T> = {");
goTo.marker("map");
verify.currentLineContentIs("    [P in keyof T]: T[P]");