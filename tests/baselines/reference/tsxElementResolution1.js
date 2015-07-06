//// [tsxElementResolution1.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		div: any
	}
}

// OK
<div />;

// Fail
<span />;

//// [tsxElementResolution1.jsx]
// OK
<div />;
// Fail
<span />;
