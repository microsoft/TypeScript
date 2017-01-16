/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
////const [|obj|] = {Component: () => <div/>};
////const element = <[|obj|].Component/>;

verify.rangesReferenceEachOther();
