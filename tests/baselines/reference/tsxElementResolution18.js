//// [tsxElementResolution18.tsx]
declare module JSX {
	interface Element { }
}

// Error under implicit any
<div n='x' />;


//// [tsxElementResolution18.jsx]
// Error under implicit any
<div n='x'/>;
