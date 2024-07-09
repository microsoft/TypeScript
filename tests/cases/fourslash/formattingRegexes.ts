///<reference path="fourslash.ts"/>

////removeAllButLast(sortedTypes, undefinedType, /keepNullableType**/ true)/*1*/

goTo.marker("1");
edit.insert(";");
verify.currentLineContentIs("removeAllButLast(sortedTypes, undefinedType, /keepNullableType**/ true);");

