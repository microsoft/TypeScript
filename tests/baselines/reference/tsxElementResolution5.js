//// [tests/cases/conformance/jsx/tsxElementResolution5.tsx] ////

//// [file1.tsx]
declare module JSX {
	interface Element { }
}

// OK, but implicit any
<div n='x' />;


//// [file1.jsx]
// OK, but implicit any
<div n='x'/>;
