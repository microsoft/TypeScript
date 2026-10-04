// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

interface PoisonedProp {
    x: string;
    y: 2;
}

class Poisoned extends React.Component<PoisonedProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

let obj = {
    x: "hello world",
    y: 2
};

// Error as "obj" has type { x: string; y: number }
let p = <Poisoned {...obj} />;

class EmptyProp extends React.Component<{}, {}> {
    render() {
        return <div>Default hi</div>;
    }
    greeting: string;
}

let o = {
    prop1: false
}
// Ok
let e = <EmptyProp {...o} />;