/// <reference path='fourslash.ts' />

// @filename: a.tsx
////import * as React from 'react';
////interface SomeInterface {
////    someBoolean: boolean,
////    someString: string;
////}
////interface SomeProps {
////    someProp: SomeInterface;
////}
////export const /*1*/SomeStatelessComponent = ({someProp: { someBoolean, someString}}: SomeProps) => (<div>{`${someBoolean}${someString}`});

goTo.marker("1");
verify.quickInfoExists();
