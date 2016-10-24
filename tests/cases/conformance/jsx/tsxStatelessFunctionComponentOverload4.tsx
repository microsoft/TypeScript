// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react')
declare function OneThing(): JSX.Element;
declare function OneThing(l: {yy: number, yy1: string}): JSX.Element;

let obj = {
    yy: 10,
    yy1: "hello"
}
let obj2 = undefined;

// Error
const c0 = <OneThing extraProp />;  // extra property;
const c1 = <OneThing yy={10}/>;  // missing property;
const c2 = <OneThing {...obj} yy1 />; // type incompatible;
const c3 = <OneThing {...obj} {...{extra: "extra attr"}} />;  // Extra attribute;
const c4 = <OneThing {...obj} y1={10000} />;  // extra property;
const c5 = <OneThing {...obj} {...{yy: true}} />;  // type incompatible;
const c6 = <OneThing {...obj2} {...{extra: "extra attr"}} />;  // Should error as there is extra attribute that doesn't match any. Current it is not
const c7 = <OneThing {...obj2} yy />;  // Should error as there is extra attribute that doesn't match any. Current it is not
