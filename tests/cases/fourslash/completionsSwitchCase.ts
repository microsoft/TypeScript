/// <reference path='fourslash.ts'/>

////enum E { A, B }
////declare const e: E;
////switch (e) {
////    case /*1*/
////}
////switch (e) {
////    case E.B:
////    case /*2*/:
////    default:
////    case nonsense:
////}

verify.completionsAt("1", ["E.A", "E.B"]);
verify.completionsAt("2", ["E.A"]);
