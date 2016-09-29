//@filename: file.tsx
//@jsx: react
// An error should be thrown when jsxFactory and reactNamespace are both specified.
//@jsxFactory: React.createElement
//@reactNamespace: React
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

declare var React: any;

<div />;
