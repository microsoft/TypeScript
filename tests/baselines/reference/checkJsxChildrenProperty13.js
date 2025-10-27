//// [tests/cases/conformance/jsx/checkJsxChildrenProperty13.tsx] ////

//// [file.tsx]
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


//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Button extends React.Component {
    render() {
        // Error children are specified twice
        return (<InnerButton {...this.props} children="hi">
            <div>Hello World</div>
            </InnerButton>);
    }
}
class InnerButton extends React.Component {
    render() {
        return (<button>Hello</button>);
    }
}
