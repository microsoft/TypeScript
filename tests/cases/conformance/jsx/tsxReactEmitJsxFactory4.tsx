//@filename: file.tsx
//@jsx: react
//@jsxFactory: a.b.c
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

declare var a: any;

<div />;
