/// <reference path='fourslash.ts'/>

////with (x) {
////    function /*1*/f() { }
////    var /*2*/b = /*3*/f;
////}

verify.quickInfos({
    1: "any",
    2: "any",
    3: "any"
});
