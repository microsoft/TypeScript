//// [tests/cases/conformance/jsx/jsxParsingError1.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

// This should be a parse error
const class1 = "foo";
const class2 = "bar";
const elem = <div className={class1, class2}/>;


//// [file.jsx]
"use strict";
// This should be a parse error
const class1 = "foo";
const class2 = "bar";
const elem = <div className={(class1, class2)}/>;
