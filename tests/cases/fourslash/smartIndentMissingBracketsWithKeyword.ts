/// <reference path='fourslash.ts'/>

////with /*1*/

goTo.marker("1");
edit.insert("\n");
verify.indentationIs(0);
