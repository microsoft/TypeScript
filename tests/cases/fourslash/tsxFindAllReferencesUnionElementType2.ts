/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @noLib: true

//// class RC1 extends React.Component<{}, {}> {
////     render() {
////         return null;
////     }
//// }

//// class RC2 extends React.Component<{}, {}> {
////     render() {
////         return null;
////     }
////     private method() { }
//// }

//// [|var [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}RCComp|] = RC1 || RC2;|]
//// [|<[|{| "contextRangeIndex": 2 |}RCComp|] />|]

verify.singleReferenceGroup("var RCComp: typeof RC1", "RCComp");
