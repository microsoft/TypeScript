/// <reference path='fourslash.ts'/>

////const result = [{ a: 'hello' }]
////    .map(({ /*1*/a }) => /*2*/a)
////    .map(a => a);
////
////const f1 = (a: (b: string[]) => void) => {};
////f1(([a, b]) => { /*3*/a.charAt(0); });
////
////function f2({/*4*/a }: { a: string; }, [/*5*/b]: [string]) {}

verify.quickInfos({
    1: "(parameter) a: string",
    2: "(parameter) a: string",
    3: "(parameter) a: string",
    4: "(parameter) a: string",
    5: "(parameter) b: string"
});
