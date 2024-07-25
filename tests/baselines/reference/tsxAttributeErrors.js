//// [tests/cases/conformance/jsx/tsxAttributeErrors.tsx] ////

//// [tsxAttributeErrors.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		div: {
			text?: string;
			width?: number;
		}

		span: any;
	}
}

// Error, number is not assignable to string
<div text={42} />;

// Error, string is not assignable to number
<div width={'foo'} />;

// Error, number is not assignable to string
var attribs = { text: 100 };
<div {...attribs} />;

// No errors here
<span foo='bar' bar={'foo'} />;


//// [tsxAttributeErrors.jsx]
// Error, number is not assignable to string
<div text={42}/>;
// Error, string is not assignable to number
<div width={'foo'}/>;
// Error, number is not assignable to string
var attribs = { text: 100 };
<div {...attribs}/>;
// No errors here
<span foo='bar' bar={'foo'}/>;
