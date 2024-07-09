/// <reference path='fourslash.ts'/>

////declare function fn(x: string);
////declare function fn(x: string, y: number);
////declare function fn2(x: string);
////declare function fn2(x: string, y: number);
////fn('', fn2(/*1*/

verify.signatureHelp({
    marker: "1",
    overloadsCount: 2,
    text: "fn2(x: string): any",
    parameterName: "x",
    parameterSpan: "x: string",
});

edit.insert("'',");
verify.signatureHelp({
    overloadsCount: 2,
    text: "fn2(x: string, y: number): any",
    parameterName: "y",
    parameterSpan: "y: number",
});
