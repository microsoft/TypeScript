/// <reference path="fourslash.ts"/>

////var x = 1;
////namespace M {
////    export var x = 2;
////    console.log(/*1*/x); // 2
////}
////namespace M {
////    console.log(/*2*/x); // 2
////}
////namespace M {
////    var x = 3;
////    console.log(/*3*/x); // 3
////}

verify.quickInfos({
    1: "var M.x: number",
    2: "var M.x: number",
    3: "var x: number"
});
