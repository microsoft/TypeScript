/// <reference path="fourslash.ts"/>

////declare var /*1*/f: (x: number) => number;
////function baz() {
////    var x = /*2*/f(3);
////    /*3*/f(3);
////}

[1, 2, 3].forEach((val) => {
    goTo.marker("" + val);
    verify.quickInfoIs("(x: number) => number", "", "f", "var");
} );