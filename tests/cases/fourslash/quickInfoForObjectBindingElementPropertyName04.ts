/// <reference path='fourslash.ts'/>

////interface Recursive {
////    next?: Recursive;
////    value: any;
////}
////
////function f ({ /*1*/next: { /*2*/next: x} }) {
////}

goTo.marker("1");
verify.quickInfoIs(`(property) next: {
    next: any;
}`);

goTo.marker("2");
verify.quickInfoIs("(property) next: any");