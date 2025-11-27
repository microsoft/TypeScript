//@filename: file.tsx
//@jsx: preserve
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		div: any
	}
}

// OK
<div />;

// Fail
<span />;