/// <reference path='fourslash.ts'/>

// @jsx: preserve

// @Filename: /a.tsx
////namespace JSX {
////    export interface Element { }
////    export interface IntrinsicElements {
////        [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}div|]: any;|]
////    }
////}
////
////[|const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}Comp|] = () =>
////    [|<[|{| "contextRangeIndex": 4 |}div|]>
////        Some content
////        [|<[|{| "contextRangeIndex": 6 |}div|]>More content</[|{| "contextRangeIndex": 6 |}div|]>|]
////    </[|{| "contextRangeIndex": 4 |}div|]>|];|]
////
////const x = [|<[|{| "contextRangeIndex": 10 |}Comp|]>
////    Content
////</[|{| "contextRangeIndex": 10 |}Comp|]>|];

const [d0Def, d0, c0Def, c0, d1Def, d1, d2Def, d2, d3, d4, c1Def, c1, c2] = test.ranges();

const allD = [d0, d1, d2, d3, d4];
const allC = [c0, c1, c2];

verify.singleReferenceGroup("(property) JSX.IntrinsicElements.div: any", allD);
verify.singleReferenceGroup("const Comp: () => JSX.Element", allC);

// For document highlights, we will just do tag matching if on a tag. Otherwise we find-all-references.
verify.documentHighlightsOf(d0, [d0, d1, d2, d3, d4]);
verify.rangesAreDocumentHighlights([d1, d4]);
verify.rangesAreDocumentHighlights([d2, d3]);

verify.documentHighlightsOf(c0, [c0, c1, c2]);
verify.rangesAreDocumentHighlights([c1, c2]);
