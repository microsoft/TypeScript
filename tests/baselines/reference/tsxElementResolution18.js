//// [file1.tsx]
declare module JSX {
	interface Element { }
}

// Error under implicit any
<div n='x' />;


//// [file1.jsx]
// Error under implicit any
<div n='x'/>;
