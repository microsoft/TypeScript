/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
////const /*1*/obj = {Component: () => <div/>};
////const element = </*2*/obj.Component/>;

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);