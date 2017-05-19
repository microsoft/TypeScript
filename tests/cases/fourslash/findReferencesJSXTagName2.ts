/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
////const [|{| "isWriteAccess": true, "isDefinition": true |}obj|] = {Component: () => <div/>};
////const element = <[|obj|].Component/>;

verify.singleReferenceGroup(`const obj: {
    Component: () => any;
}`);
