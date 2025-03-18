//// [tests/cases/conformance/jsx/checkJsxChildrenProperty12.tsx] ////

//// [file.tsx]
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


//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Button extends React.Component {
    render() {
        let condition;
        if (condition) {
            return <InnerButton {...this.props}/>;
        }
        else {
            return (<InnerButton {...this.props}>
				<div>Hello World</div>
				</InnerButton>);
        }
    }
}
class InnerButton extends React.Component {
    render() {
        return (<button>Hello</button>);
    }
}
