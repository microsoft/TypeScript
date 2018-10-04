/// <reference path='fourslash.ts' />

////declare module 'foobar' {
////    interface Q { x: number; }
////}
////declare module 'thing' {
////    import x = require('foobar');
////    var m: x./*1*/; 
////}

// Q does not show up in member list of x
goTo.marker("1");
verify.completionListContains("Q");
