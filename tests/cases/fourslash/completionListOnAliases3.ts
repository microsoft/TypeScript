/// <reference path='fourslash.ts' />

////declare module 'foobar' {
////    interface Q { x: number; }
////}
////declare module 'thing' {
////    import x = require('foobar');
////    var m: x./*1*/;
////}

verify.completions({ marker: "1", exact: "Q" });
