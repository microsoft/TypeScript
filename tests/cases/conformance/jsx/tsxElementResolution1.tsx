//@filename: file.tsx
//@jsx: preserve
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