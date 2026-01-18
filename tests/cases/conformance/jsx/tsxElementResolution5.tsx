//@jsx: preserve
//@filename: file1.tsx
declare namespace JSX {
	interface Element { }
}

// OK, but implicit any
<div n='x' />;
