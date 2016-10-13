//// [file.tsx]
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

declare var h: any;

<div />;


//// [file.js]
h("div", null);
