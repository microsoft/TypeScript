/// <reference path='fourslash.ts'/>

// @jsx: preserve

// @Filename: /a.tsx
////namespace JSX {
////    export interface Element { }
////    export interface IntrinsicElements {
////        [|{| "isWriteAccess": true, "isDefinition": true |}div|]: any;
////    }
////}
////
////const [|{| "isWriteAccess": true, "isDefinition": true |}Comp|] = () =>
////    <[|div|]>
////        Some content
////        <[|div|]>More content</[|div|]>
////    </[|div|]>;
////
////const x = <[|Comp|]>
////    Content
////</[|Comp|]>;

const ranges = test.ranges();
const [d0, c0, d1, d2, d3, d4, c1, c2] = test.ranges();

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
