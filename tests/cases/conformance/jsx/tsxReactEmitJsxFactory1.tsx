//@filename: file.tsx
//@jsx: react
//@jsxFactory: h
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

// This should raise an error as 'h' is not declared.
<div />;
