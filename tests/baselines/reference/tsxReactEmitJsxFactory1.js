//// [file.tsx]
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

// This should issue an error as 'h' is not declared.
<div />;


//// [file.js]
// This should issue an error as 'h' is not declared.
h("div", null);
