/// <reference path='fourslash.ts'/>

////var x/*1*/x = true ? [1] : [undefined]; 
////var y/*2*/y = true ? [1] : [];

verify.quickInfos({
    1: "var xx: number[]",
    2: "var yy: number[]"
});
