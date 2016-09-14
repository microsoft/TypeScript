/// <reference path='fourslash.ts'/>

////interface A { }
////var f44: (x: A) => (y: A) => A = /*1*/x => /*2*/y => /*3*/x;

verify.quickInfos({
    1: "(parameter) x: A",
    2: "(parameter) y: A",
    3: "(parameter) x: A"
});
