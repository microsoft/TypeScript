//// [file.tsx]
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

//// [file.jsx]
// OK
<div />;
// OK
<span />;
