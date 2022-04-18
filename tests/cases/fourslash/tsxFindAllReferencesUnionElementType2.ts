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

//// /*1*/var /*2*/RCComp = RC1 || RC2;
//// /*3*/</*4*/RCComp />

verify.baselineFindAllReferences('1', '2', '3', '4');
