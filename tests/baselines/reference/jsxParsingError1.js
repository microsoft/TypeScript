//// [tests/cases/conformance/jsx/jsxParsingError1.tsx] ////

//// [file.tsx]
declare module JSX {
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
// This should be a parse error
var class1 = "foo";
var class2 = "bar";
var elem = <div className={class1, class2}/>;
