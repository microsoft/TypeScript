/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: {
////             [|{| "isWriteAccess": true, "isDefinition": true |}name|]?: string;
////             isOpen?: boolean;
////         };
////         span: { n: string; };
////     }
//// }
//// var x = <div [|{| "isWriteAccess": true, "isDefinition": true |}name|]="hello" />;

verify.singleReferenceGroup("(property) name?: string");
