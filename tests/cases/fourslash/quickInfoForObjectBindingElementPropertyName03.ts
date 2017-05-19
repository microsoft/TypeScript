/// <reference path='fourslash.ts'/>

////interface Recursive {
////    next?: Recursive;
////    value: any;
////}
////
////function f ({ /*1*/next: { /*2*/next: x} }: Recursive) {
////}

for (const marker of test.markerNames()) {
    verify.quickInfoAt(marker, "(property) Recursive.next: Recursive");
}