/// <reference path='fourslash.ts'/>

////function x1(x: 'hi');
////function x1(y: 'bye');
////function x1(z: string);
////function x1(a: any) {
////}
////
////x1(''/*1*/);
////x1('hi'/*2*/);
////x1('bye'/*3*/);

verify.signatureHelp(
    { marker: "1", overloadsCount: 3, parameterName: "z", parameterSpan: "z: string" },
    { marker: "2", overloadsCount: 3, parameterName: "x", parameterSpan: 'x: "hi"' },
    { marker: "3", overloadsCount: 3, parameterName: "y", parameterSpan: 'y: "bye"' },
);
