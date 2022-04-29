/// <reference path="fourslash.ts"/>

//// function foo() {
////     function getOccurrencesAtPosition() {
////         switch (node) {
////             enum /*1*/
////         }
////
////         return undefined;
////
////         function keywordToReferenceEntry() {
////         }
////     }
////
////     return {
////         getEmitOutput: (filename): Bar => null,
////     };
//// }

// Force a syntax tree ot be created.
verify.noMatchingBracePositionInCurrentFile(0);

goTo.marker('1');
edit.insert('Fo');
