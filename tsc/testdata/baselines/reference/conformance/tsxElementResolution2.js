//// [tests/cases/conformance/jsx/tsxElementResolution2.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
	    [x: string]: any;
	}
}

// OK
<div />;

// OK
<span />;

//// [file.jsx]
"use strict";
// OK
<div />;
// OK
<span />;
