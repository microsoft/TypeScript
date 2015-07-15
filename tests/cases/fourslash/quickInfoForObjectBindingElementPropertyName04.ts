/// <reference path='fourslash.ts'/>

////interface Recursive {
////    next?: Recursive;
////    value: any;
////}
////
////function f ({ /*1*/next: { /*2*/next: x} }) {
////}

for (let { position } of test.markers()) {
    goTo.position(position)
    verify.quickInfoIs("(property) next: any");
}