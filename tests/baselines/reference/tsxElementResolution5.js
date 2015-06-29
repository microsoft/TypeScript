//// [tsxElementResolution5.tsx]
declare module JSX {
	interface Element { }
}

// OK, but implicit any
<div n='x' />;


//// [tsxElementResolution5.jsx]
// OK, but implicit any
<div n='x'/>;
