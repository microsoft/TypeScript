//// [tests/cases/conformance/jsx/tsxParseTests2.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements { div; span; }
}

var x = </**/div></div>;


//// [file.jsx]
var x = <div></div>;
