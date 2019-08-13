/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
////[|const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}obj|] = {Component: () => <div/>};|]
////const element = <[|obj|].Component/>;

verify.singleReferenceGroup(`const obj: {
    Component: () => any;
}`, "obj");
