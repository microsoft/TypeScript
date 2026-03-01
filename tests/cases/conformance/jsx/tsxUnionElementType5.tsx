// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: react
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

function EmptySFC1() {
    return <div>hello</div>;
}

function EmptySFC2() {
    return <div>Hello</div>;
}

function SFC2(prop: { x: boolean }) {
    return <h1>World</h1>;
}

var EmptySFCComp = EmptySFC1 || EmptySFC2;
var SFC2AndEmptyComp = SFC2 || EmptySFC1;

let a = <EmptySFCComp />
let a1 = <EmptySFCComp data-prop />
let b = <SFC2AndEmptyComp x />