//// [file.tsx]
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

//// [file.jsx]
// OK
<div />;
// Fail
<span />;
