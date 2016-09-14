/// <reference path='fourslash.ts'/>

// Repros from issues #4949 and #4818

////const result = [{ foo: 'hello' }]
////    .map(({ /*1*/foo }) => /*2*/foo)
////    .map(foo => foo);
////
////const f = (foo: (bar: string[]) => void) => { };
////
////f(([a, b]) => {
////    /*3*/a.charAt(0); // Not okay: inferred as `any`
////});

verify.quickInfos({
    1: "var foo: string",
    2: "var foo: string",
    3: "var a: string"
});
