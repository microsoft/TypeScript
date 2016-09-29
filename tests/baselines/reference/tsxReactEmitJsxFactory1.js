//// [file.tsx]
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

// This should raise an error as 'h' is not declared.
<div />;


//// [file.js]
// This should raise an error as 'h' is not declared.
h("div", null);
