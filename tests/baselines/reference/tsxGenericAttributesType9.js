//// [tests/cases/conformance/jsx/tsxGenericAttributesType9.tsx] ////

//// [file.tsx]
import React = require('react');

export function makeP<P>(Ctor: React.ComponentClass<P>) {
	return class extends React.PureComponent<P, void> {
		public render(): JSX.Element {
			return (
				<Ctor {...this.props } />
			);
		}
	};
}



//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeP = makeP;
const React = require("react");
function makeP(Ctor) {
    return class extends React.PureComponent {
        render() {
            return (<Ctor {...this.props}/>);
        }
    };
}
