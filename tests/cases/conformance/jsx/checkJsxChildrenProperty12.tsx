// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface ButtonProp {
    a: number,
    b: string,
    children: Button;
}

class Button extends React.Component<ButtonProp, any> {
    render() {
        return <InnerButton {...this.props} />
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
