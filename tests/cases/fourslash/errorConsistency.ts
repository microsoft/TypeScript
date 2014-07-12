/// <reference path="fourslash.ts"/>

////interface Int<T> {
////val<U>(f: (t: T) => U): Int<U>;
////}
////declare var v1: Int<string>;
////var /*1*/v2: Int<number> = v1/*2*/;

goTo.eof();
verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(1);
edit.backspace(1);
verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(1);
