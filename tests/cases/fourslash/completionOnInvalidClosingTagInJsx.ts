/// <reference path="fourslash.ts"/>

// @Filename: file.tsx
////let React: any;
////let x = <someName text="123"><//*1*/>

goTo.marker("1");
verify.completionListIsEmpty();