/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @jsx: react
// @esModuleInterop: true
// @skipLibCheck: true
// @Filename: declarations.d.ts
////declare namespace JSX {
////  interface Element {}
////  interface IntrinsicElements { [index: string]: {} }
////}
////declare var React: any;
// @Filename: MyComponent.jsx
////class MyComponent extends React.Component {
////  render() {
////    return (
////      <div>
////        {[|/*1*/doesNotExist|]}
////      </div>
////    );
////  }
////}
// @Filename: MyComponent2.jsx
////class MyComponent2 extends React.Component {
////  render() {
////    return (
////      <div>
////        Aleph{[|/*2*/doesNotExist|]}Bet
////      </div>
////    );
////  }
////}
// @Filename: MyComponent3.jsx
////class MyComponent3 extends React.Component {
////  render() {
////    return (
////      <div>
////        <[|/*3*/DoesNotExist|] />
////      </div>
////    );
////  }
////}

goTo.file(1);
verify.getSyntacticDiagnostics([]);
verify.getSemanticDiagnostics([{ code: 2304, message: "Cannot find name 'doesNotExist'." }]);
verify.codeFix({
    index: 0,
    description: "Ignore this error message",
    newFileContent: `class MyComponent extends React.Component {
  render() {
    return (
      <div>
        {
// @ts-ignore
        doesNotExist}
      </div>
    );
  }
}`
});
goTo.file(2);
verify.codeFix({
    index: 0,
    description: "Ignore this error message",
    newFileContent: `class MyComponent2 extends React.Component {
  render() {
    return (
      <div>
        Aleph{
// @ts-ignore
        doesNotExist}Bet
      </div>
    );
  }
}`
});
goTo.file(3);
verify.codeFix({
    index: 0,
    description: "Ignore this error message",
    newFileContent: `class MyComponent3 extends React.Component {
  render() {
    return (
      <div>
        <
// @ts-ignore
        DoesNotExist />
      </div>
    );
  }
}`
});
