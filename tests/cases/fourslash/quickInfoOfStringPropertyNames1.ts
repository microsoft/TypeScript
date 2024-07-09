/// <reference path='fourslash.ts'/>

////interface foo {
////    "foo bar": string;
////}

////var f: foo;
////var /*1*/r = f['foo bar'];

////class bar {
////    'hello world': number;
////    '1': string;
////    constructor() {
////        bar['hello world'] = 3;
////    }
////}

////var b: bar;
////var /*2*/r2 = b["hello world"];
////var /*3*/r4 = b['1'];
////var /*4*/r5 = b[1];

verify.quickInfos({
    1: "var r: string",
    2: "var r2: number",
    3: "var r4: string",
    4: "var r5: string"
});
