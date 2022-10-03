/// <reference path="../fourslash.ts"/>

////switch (x) {
////    case[]:
////}

format.document();
verify.currentFileContentIs(
`switch (x) {
    case []:
}`);
