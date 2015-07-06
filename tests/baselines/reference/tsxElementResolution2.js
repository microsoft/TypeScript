//// [tsxElementResolution2.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
	    [x: string]: any;
	}
}

// OK
<div />;

// OK
<span />;

//// [tsxElementResolution2.jsx]
// OK
<div />;
// OK
<span />;
