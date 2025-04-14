/// <reference path='fourslash.ts'/>

// @jsx: preserve

// @Filename: /a.tsx
////namespace JSX {
////    export interface Element { }
////    export interface IntrinsicElements {
////        [|[|/*1*/div|]: any;|]
////    }
////}
////
////[|const [|/*6*/Comp|] = () =>
////    [|<[|/*2*/div|]>
////        Some content
////        [|<[|/*3*/div|]>More content</[|/*4*/div|]>|]
////    </[|/*5*/div|]>|];|]
////
////const x = [|<[|/*7*/Comp|]>
////    Content
////</[|/*8*/Comp|]>|];

const [d0Def, d0, c0Def, c0, d1Def, d1, d2Def, d2, d3, d4, c1Def, c1, c2] = test.ranges();

const allD = [d0, d1, d2, d3, d4];
const allC = [c0, c1, c2];

verify.baselineFindAllReferences(
    // div occurrences
    '1', '2', '3', '4', '5',
    // Comp occurrences
    '6', '7', '8'
);
// For document highlights, we will just do tag matching if on a tag. Otherwise we find-all-references.
verify.baselineDocumentHighlights(allD);
verify.baselineDocumentHighlights(allC);