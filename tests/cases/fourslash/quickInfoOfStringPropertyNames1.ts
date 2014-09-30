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

goTo.marker('1');
verify.quickInfoIs('(var) r: string');

goTo.marker('2');
verify.quickInfoIs('(var) r2: number');

goTo.marker('3');
verify.quickInfoIs('(var) r4: string');

goTo.marker('4');
verify.quickInfoIs('(var) r5: string');
