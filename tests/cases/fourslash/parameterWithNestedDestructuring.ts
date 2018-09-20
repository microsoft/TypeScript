/// <reference path='fourslash.ts'/>

////[[{foo: 'hello', bar: [1]}]]
////  .map(([{foo, bar: [baz]}]) => /*1*/foo + /*2*/baz);

verify.quickInfos({
    1: "var foo: string",
    2: "var baz: number"
});
