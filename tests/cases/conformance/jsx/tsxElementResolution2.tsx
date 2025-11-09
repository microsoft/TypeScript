//@filename: file.tsx
//@jsx: preserve
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
	    [x: string]: any;
	}
}

// OK
<div />;

// OK
<span />;