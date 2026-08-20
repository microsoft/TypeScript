// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

interface PoisonedProp {
    x: string;
    y: number;
}

class Poisoned extends React.Component<PoisonedProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj = {
    x: "hello world",
    y: 2
};

// OK
let p = <Poisoned {...obj} />;
let y = <Poisoned x="hi" y={2} />;