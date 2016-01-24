//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements { }
}

var div: any;
// Still an error
<div n='x' />;


//// [file.jsx]
var div;
// Still an error
<div n='x'/>;
