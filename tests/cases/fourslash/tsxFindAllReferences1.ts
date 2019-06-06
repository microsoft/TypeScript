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
//// var x = [|<[|{| "declarationRangeIndex": 2 |}div|] />|];

verify.singleReferenceGroup(
    `(property) JSX.IntrinsicElements.div: {
    name?: string;
    isOpen?: boolean;
}`, "div");
