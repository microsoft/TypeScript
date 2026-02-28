/// <reference path="../fourslash.ts"/>

// @lib: es5

////switch (x) {
////    case[]:
////}

format.document();
verify.currentFileContentIs(
`switch (x) {
    case []:
}`);
