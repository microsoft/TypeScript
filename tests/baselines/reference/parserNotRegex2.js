//// [tests/cases/conformance/parser/ecmascript5/parserNotRegex2.ts] ////

//// [parserNotRegex2.ts]
declare const A: any;
declare const B: any;
declare const C: any;
const x = (A / 2);
B(
    C(),
    () => { },
    () => { }
);


//// [parserNotRegex2.js]
const x = (A / 2);
B(C(), () => { }, () => { });
