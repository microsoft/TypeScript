/// <reference path='fourslash.ts'/>

// @Filename: a.ts
//// //MyFile Comments
//// //more comments
//// /// <reference path="so/*unknownFile*/mePath.ts" />
//// /// <reference path="b/*knownFile*/.ts" />
////
//// class clsInOverload {
////     static fnOverload();
////     static fnOverload(foo: string);
////     static fnOverload(foo: any) { }
//// }
////

// @Filename: b.ts
/////*fileB*/

goTo.marker("unknownFile");
verify.not.definitionLocationExists();

goTo.marker("knownFile");
goTo.definition();
verify.caretAtMarker('fileB');
