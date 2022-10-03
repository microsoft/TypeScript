/// <reference path='fourslash.ts' />

////var foo: Function = function (/*1*/a, /*2*/b, /*3*/c) { };

verify.quickInfos({
    1: "(parameter) a: any",
    2: "(parameter) b: any",
    3: "(parameter) c: any"
});
