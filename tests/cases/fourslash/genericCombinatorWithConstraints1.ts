/// <reference path='fourslash.ts'/>

////function apply<T, U extends Date>(source: T[], selector: (x: T) => U) {
////    var /*1*/xs = source.map(selector); // any[]
////    var /*2*/xs2 = source.map((x: T, a, b): U => { return null }); // any[] 
////}

verify.quickInfos({
    1: "(local var) xs: U[]",
    2: "(local var) xs2: U[]"
});
