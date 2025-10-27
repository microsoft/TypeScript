// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react')
declare function OneThing(): JSX.Element;
declare function OneThing(l: {yy: number, yy1: string}): JSX.Element;

let obj = {
    yy: 10,
    yy1: "hello"
}
let obj2: any;

// Error
const c0 = <OneThing extraProp />;  // extra property;
const c1 = <OneThing yy={10}/>;  // missing property;
const c2 = <OneThing {...obj} yy1 />; // type incompatible;
const c3 = <OneThing {...obj} {...{extra: "extra attr"}} />;  //  This is OK because all attribute are spread
const c4 = <OneThing {...obj} y1={10000} />;  // extra property;
const c5 = <OneThing {...obj} {...{yy: true}} />;  // type incompatible;
const c6 = <OneThing {...obj2} {...{extra: "extra attr"}} />;  // Should error as there is extra attribute that doesn't match any. Current it is not
const c7 = <OneThing {...obj2} yy />;  // Should error as there is extra attribute that doesn't match any. Current it is not

declare function TestingOneThing(j: {"extra-data": string}): JSX.Element;
declare function TestingOneThing(n: {yy: string, direction?: number}): JSX.Element;

// Error
const d1 = <TestingOneThing extra-data />
const d2 = <TestingOneThing yy="hello" direction="left" />

declare function TestingOptional(a: {y1?: string, y2?: number}): JSX.Element;
declare function TestingOptional(a: {y1?: string, y2?: number, children: JSX.Element}): JSX.Element;
declare function TestingOptional(a: {y1: boolean, y2?: number, y3: boolean}): JSX.Element;

// Error
const e1 = <TestingOptional y1 y3="hello"/>
const e2 = <TestingOptional y1="hello" y2={1000} y3 />
const e3 = <TestingOptional y1="hello" y2={1000} children="hi" />
const e4 = <TestingOptional y1="hello" y2={1000}>Hi</TestingOptional>
