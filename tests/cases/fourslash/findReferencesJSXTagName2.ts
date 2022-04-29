/// <reference path='fourslash.ts'/>

// @Filename: index.tsx
/////*1*/const /*2*/obj = {Component: () => <div/>};
////const element = </*3*/obj.Component/>;

verify.baselineFindAllReferences('1', '2', '3');
