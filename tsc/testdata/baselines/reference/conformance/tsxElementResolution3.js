//// [tests/cases/conformance/jsx/tsxElementResolution3.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
	    [x: string]: { n: string; };
	}
}

// OK
<div n='x' />;

// Error
<span w='err' />;

//// [file.jsx]
"use strict";
// OK
<div n='x'/>;
// Error
<span w='err'/>;
