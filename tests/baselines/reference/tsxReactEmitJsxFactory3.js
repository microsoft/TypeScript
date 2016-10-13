//// [file.tsx]
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

declare var React: any;

<div />;


//// [file.js]
React.createElement("div", null);
