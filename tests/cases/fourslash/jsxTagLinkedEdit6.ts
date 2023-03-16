/// <reference path='fourslash.ts' />

// @Filename: /namespace.tsx
////const jsx = (
////    <someNamespa/*3*/ce./*2*/Thing>
////    </someNamespace/*1*/.Thing>
////);

const linkedCursors6 = {ranges: [{start: 19, end: 38}, 
                            {start: 46, end: 65}],
                        wordPattern : 'someNamespace.Thing'};

verify.jsxMirrorCursor( {
    "1": linkedCursors6,
    "2": linkedCursors6,
    "3": linkedCursors6,
});