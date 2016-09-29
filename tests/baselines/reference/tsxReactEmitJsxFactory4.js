//// [file.tsx]
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

declare var a: any;

<div />;


//// [file.js]
a.b.c("div", null);
