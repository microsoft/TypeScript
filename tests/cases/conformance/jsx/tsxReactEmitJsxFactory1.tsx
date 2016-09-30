//@filename: file.tsx
//@jsx: react
//@jsxFactory: h
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

// This should issue an error as 'h' is not declared.
<div />;
