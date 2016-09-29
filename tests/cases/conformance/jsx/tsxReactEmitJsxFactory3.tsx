//@filename: file.tsx
//@jsx: react
//@jsxFactory: React.createElement
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

declare var React: any;

<div />;
