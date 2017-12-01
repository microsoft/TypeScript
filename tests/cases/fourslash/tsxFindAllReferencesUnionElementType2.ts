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

//// var [|RCComp|] = RC1 || RC2;
//// <[|RCComp|] />

verify.rangesReferenceEachOther();