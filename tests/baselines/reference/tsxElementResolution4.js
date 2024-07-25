//// [tests/cases/conformance/jsx/tsxElementResolution4.tsx] ////

//// [file.tsx]
declare module JSX {
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
// OK
<div n='x'/>;
// OK
<span m='ok'/>;
// Error
<span q=''/>;
