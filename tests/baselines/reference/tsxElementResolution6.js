//// [tests/cases/conformance/jsx/tsxElementResolution6.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements { }
}

var div: any;
// Still an error
<div n='x' />;


//// [file.jsx]
var div;
// Still an error
<div n='x'/>;
