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
export function makeP(Ctor) {
    return class extends React.PureComponent {
        render() {
            return (<Ctor {...this.props}/>);
        }
    };
}
