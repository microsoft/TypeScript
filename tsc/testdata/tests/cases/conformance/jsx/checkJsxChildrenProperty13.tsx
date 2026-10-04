// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
// @strictNullChecks: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

interface ButtonProp {
    a: number,
    b: string,
    children: Button;
}

class Button extends React.Component<ButtonProp, any> {
    render() {
        // Error children are specified twice
        return (<InnerButton {...this.props} children="hi">
            <div>Hello World</div>
            </InnerButton>);
    }
}

interface InnerButtonProp {
	a: number
}

class InnerButton extends React.Component<InnerButtonProp, any> {
	render() {
		return (<button>Hello</button>);
	}
}
