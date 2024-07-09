//// [tests/cases/conformance/jsx/tsxElementResolution3.tsx] ////

//// [file.tsx]
declare module JSX {
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
// OK
<div n='x'/>;
// Error
<span w='err'/>;
