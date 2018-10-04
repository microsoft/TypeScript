/// <reference path='fourslash.ts'/>

////interface Recursive {
////    next?: Recursive;
////    value: any;
////}
////
////function f ({ /*1*/next: { /*2*/next: x} }) {
////}

verify.quickInfos({
    1: `(property) next: {
    next: any;
}`,
    2: "(property) next: any"
});
