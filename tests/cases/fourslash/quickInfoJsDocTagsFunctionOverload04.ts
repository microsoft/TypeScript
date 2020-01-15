/// <reference path='fourslash.ts'/>

// @Filename: quickInfoJsDocTagsFunctionOverload04.ts
////declare function /*1*/foo(): void;
////
/////**
//// * Doc foo overloaded
//// */
////declare function /*2*/foo(x: number): void

goTo.marker("1");
verify.verifyQuickInfoDisplayParts(
    "function",
    "declare",
    { start: 17, length: 3 },
    [
        {text:"function",kind:"keyword"},
        {text:" ",kind:"space"},
        {text:"foo",kind:"functionName"},
        {text:"(",kind:"punctuation"},
        {text:")",kind:"punctuation"},
        {text:":",kind:"punctuation"},
        {text:" ",kind:"space"},
        {text:"void",kind:"keyword"},
        {text:" ",kind:"space"},
        {text:"(",kind:"punctuation"},
        {text:"+",kind:"operator"},
        {text:"1",kind:"numericLiteral"},
        {text:" ",kind:"space"},
        {text:"overload",kind:"text"},
        {text:")",kind:"punctuation"}
    ],
    []);

goTo.marker("2");
verify.verifyQuickInfoDisplayParts(
    "function",
    "declare",
    { start: 78, length: 3 },
    [
        {text:"function",kind:"keyword"},
        {text:" ",kind:"space"},
        {text:"foo",kind:"functionName"},
        {text:"(",kind:"punctuation"},
        {text:"x",kind:"parameterName"},
        {text:":",kind:"punctuation"},
        {text:" ",kind:"space"},
        {text:"number",kind:"keyword"},
        {text:")",kind:"punctuation"},
        {text:":",kind:"punctuation"},
        {text:" ",kind:"space"},
        {text:"void",kind:"keyword"},
        {text:" ",kind:"space"},
        {text:"(",kind:"punctuation"},
        {text:"+",kind:"operator"},
        {text:"1",kind:"numericLiteral"},
        {text:" ",kind:"space"},
        {text:"overload",kind:"text"},
        {text:")",kind:"punctuation"}
    ],
    [{ text: "Doc foo overloaded", kind: "text" }]);
