//// [file.tsx]
// An error should be thrown when jsxFactory and reactNamespace are both specified.
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

declare var React: any;

<div />;


//// [file.js]
React.createElement("div", null);
