//@jsx: preserve
//@filename: file1.tsx
//@noimplicitany: true
declare module JSX {
	interface Element { }
}

// Error under implicit any
<div n='x' />;
