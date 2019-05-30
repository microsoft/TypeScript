/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}div|]: {
////             name?: string;
////             isOpen?: boolean;
////         };|]
////         span: { n: string; };
////     }
//// }
//// var x = <[|div|] />;

const rangesByText = test.rangesByText();
verify.singleReferenceGroup(
    `(property) JSX.IntrinsicElements.div: {
    name?: string;
    isOpen?: boolean;
}`,
    rangesByText.get("div")
);
