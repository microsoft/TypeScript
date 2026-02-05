//// [tests/cases/conformance/jsx/tsxElementResolution4.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
	    div: { n: string; };
	    span: { m: string; };
	}
}

// OK
<div n='x' />;

// OK
<span m='ok' />;

// Error
<span q='' />;


//// [file.jsx]
"use strict";
// OK
<div n='x'/>;
// OK
<span m='ok'/>;
// Error
<span q=''/>;
