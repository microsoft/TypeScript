//// [tsxElementResolution6.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements { }
}

var div: any;
// Still an error
<div n='x' />;


//// [tsxElementResolution6.jsx]
var div;
// Still an error
<div n='x'/>;
