//// [tests/cases/conformance/jsx/tsxElementResolution5.tsx] ////

//// [file1.tsx]
declare namespace JSX {
	interface Element { }
}

// OK, but implicit any
<div n='x' />;


//// [file1.jsx]
"use strict";
// OK, but implicit any
<div n='x'/>;
