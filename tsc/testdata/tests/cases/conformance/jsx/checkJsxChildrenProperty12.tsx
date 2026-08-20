// @target: es2015
// @module: commonjs
// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

interface ButtonProp {
    a: number,
    b: string,
    children: Button;
}

class Button extends React.Component<ButtonProp, any> {
    render() {
		let condition: boolean;
		if (condition) {
        	return <InnerButton {...this.props} />
		}
		else {
			return (<InnerButton {...this.props} >
				<div>Hello World</div>
				</InnerButton>);
		}
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
