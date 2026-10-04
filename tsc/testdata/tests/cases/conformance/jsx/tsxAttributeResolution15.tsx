// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
// @noImplicitAny: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

class BigGreeter extends React.Component<{ }, {}> {
    render() {
        return <div>Default hi</div>;
    }
    greeting: string;
}

// Error
let a = <BigGreeter prop1="hello" />

// OK
let b = <BigGreeter ref={(input) => { this.textInput = input; }} />
let c = <BigGreeter data-extra="hi" />