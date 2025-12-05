//@filename: file.tsx
//@jsx: preserve
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements { }
}

var div: any;
// Still an error
<div n='x' />;
