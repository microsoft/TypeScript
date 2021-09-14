/// <reference path='fourslash.ts'/>

////[[{ a: 'hello', b: [1] }]]
////  .map(([{ a, b: [c] }]) => /*1*/a + /*2*/c);

////function f([[/*3*/a]]: [[string]], { b1: { /*4*/b2 } }: { b1: { b2: string; } }) {}

verify.quickInfos({
    1: "(parameter) a: string",
    2: "(parameter) c: number",
    3: "(parameter) a: string",
    4: "(parameter) b2: string"
});
