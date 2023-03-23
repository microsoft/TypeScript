/// <reference path='fourslash.ts' />

// @Filename: /namespace.tsx
////const jsx = (
////    <someNamespa/*3*/ce./*2*/Thing>
////    </someNamespace/*1*/.Thing>
////);

const linkedCursors6 = {ranges: [{start: 19, length: 19}, 
                            {start: 46,  length: 19}],
                        wordPattern : 'someNamespace.Thing'};

verify.jsxLinkedEdit( {
    "1": linkedCursors6,
    "2": linkedCursors6,
    "3": linkedCursors6,
});