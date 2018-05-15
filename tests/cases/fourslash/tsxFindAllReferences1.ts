/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         [|{| "isWriteAccess": true, "isDefinition": true |}div|]: {
////             name?: string;
////             isOpen?: boolean;
////         };
////         span: { n: string; };
////     }
//// }
//// var x = <[|div|] />;

verify.singleReferenceGroup(`(property) JSX.IntrinsicElements.div: {
    name?: string;
    isOpen?: boolean;
}`);
