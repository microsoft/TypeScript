/// <reference path="fourslash.ts"/>

////try {
////} /*0*/catch        {
////}
////
////try {
////} /*1*/catch{
////}

format.document();

for (const marker of test.markers()) {
    goTo.marker(marker);
    verify.currentLineContentIs("} catch {");
}
