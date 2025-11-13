//@jsx: preserve
//@filename: file1.tsx
//@noimplicitany: true
declare namespace JSX {
	interface Element { }
}

// Error under implicit any
<div n='x' />;
