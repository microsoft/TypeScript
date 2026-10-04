// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

interface OptionProp {
    x?: 2
    y?: boolean
}

class Opt extends React.Component<OptionProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj: OptionProp = {};
const obj1: OptionProp = {
    x: 2
}

// OK
let p = <Opt />;
let y = <Opt {...obj} />;
let y1 = <Opt {...obj1} />;
let y2 = <Opt {...obj1} y/>;
let y3 = <Opt x={2} />;