// @filename: file.tsx
// @jsx: react
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

function EmptySFC1() {
    return <div>Hi</div>
}

function EmptySFC2() {
    return <div>Hello</div>
}

function SFC2(prop: { x: boolean }) {
    return <h1>World</h1>;
}

var EmptySFCComp = EmptySFC1 || EmptySFC2;
var SFC2AndEmptyComp = SFC2 || EmptySFC1;
// Error
let a = <EmptySFCComp x />;
let b = <SFC2AndEmptyComp x="hi" />;
let c = <SFC2AndEmptyComp />;
let d = <SFC2AndEmptyComp data-prop />;

