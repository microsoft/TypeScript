/// <reference path="fourslash.ts"/>

////[|import a from 'a/aaaaaaa/aaaaaaa/aaaaaa/aaaaaaa';
/////**/import b from 'b';
////import c from 'c';|]
////
////[|/** @internal */|]
////export class LanguageIdentifier[| { }|]

// Force a syntax tree ot be created.
verify.outliningSpansInCurrentFile(test.ranges());
goTo.marker("");
edit.backspace(test.marker("").position);
verify.outliningSpansInCurrentFile(test.ranges());

