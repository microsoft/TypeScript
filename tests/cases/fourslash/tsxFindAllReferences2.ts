/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: {
////             [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}name|]?: string;|]
////             isOpen?: boolean;
////         };
////         span: { n: string; };
////     }
//// }
//// var x = <div [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 2 |}name|]="hello"|] />;

const rangesByText = test.rangesByText();
verify.singleReferenceGroup(
    "(property) name ?: string",
    rangesByText.get("name")
);
