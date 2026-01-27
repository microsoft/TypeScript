// @filename: file.tsx
// @jsx: react
// @skipLibCheck: true
// @libFiles: react.d.ts

import React = require('react');

function SFC1(prop: { x: number }) {
    return <div>hello</div>;
};

function SFC2(prop: { x: boolean }) {
    return <h1>World </h1>;
}

var SFCComp = SFC1 || SFC2;
<SFCComp x={"hi"}/>