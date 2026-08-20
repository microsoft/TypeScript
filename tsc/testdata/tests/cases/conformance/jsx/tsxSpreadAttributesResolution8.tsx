// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

const obj = {};
const obj1 = {
    x: 2
}
const obj3 = {
    y: true,
    overwrite: "hi"
}

interface Prop {
    x: number
    y: boolean
    overwrite: string
}

class OverWriteAttr extends React.Component<Prop, {}> {
    render() {
        return <div>Hello</div>;
    }
}

// OK
let x = <OverWriteAttr {...obj} y overwrite="hi" {...obj1} />
let x1 = <OverWriteAttr {...obj1} {...obj3}  />