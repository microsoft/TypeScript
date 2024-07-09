//@filename: file.tsx
//@jsx: preserve
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