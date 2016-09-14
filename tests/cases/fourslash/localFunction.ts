/// <reference path='fourslash.ts' />

////function /*1*/foo() {
////    function /*2*/bar2() {
////    }
////    var y = function /*3*/bar3() {
////    }
////}
////var x = function /*4*/bar4() {
////}

verify.quickInfos({
    1: "function foo(): void",
    2: "(local function) bar2(): void",
    3: "(local function) bar3(): void",
    4: "(local function) bar4(): void"
});
