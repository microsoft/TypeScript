//// [tsxElementResolution3.tsx]
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

//// [tsxElementResolution3.jsx]
// OK
<div n='x'/>;
// Error
<span w='err'/>;
