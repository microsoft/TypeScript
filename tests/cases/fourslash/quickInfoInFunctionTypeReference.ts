/// <reference path='fourslash.ts' />

////function map(fn: (variab/*1*/le1: string) => void) {
////}
////var x = <{ (fn: (va/*2*/riable2: string) => void, a: string): void; }> () => { };

verify.quickInfos({
    1: "(parameter) variable1: string",
    2: "(parameter) variable2: string"
});
