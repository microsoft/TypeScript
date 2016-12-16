/// <reference path="fourslash.ts"/>

////declare var /*1*/f: (x: number) => number;
////function baz() {
////    var x = /*2*/f(3);
////    /*3*/f(3);
////}

for (const val of [1, 2, 3]) {
    verify.quickInfoAt("" + val, "var f: (x: number) => number");
}
