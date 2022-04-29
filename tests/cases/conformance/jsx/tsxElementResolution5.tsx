//@jsx: preserve
//@filename: file1.tsx
declare module JSX {
	interface Element { }
}

// OK, but implicit any
<div n='x' />;
