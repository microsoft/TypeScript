/// <reference path="fourslash.ts"/>

////declare var /*1*/f: (x: number) => number;
////function baz() {
////    var x = /*2*/f(3);
////    /*3*/f(3);
////}

// Declaration is shown as type information
goTo.marker("1");
verify.quickInfoIs("(var) f: (x: number) => number", "");

// But the call sites show the signatures selected
[2, 3].forEach((val) => {
    goTo.marker("" + val);
    verify.quickInfoIs("(function) f(x: number): number", "");
} );