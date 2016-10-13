//@filename: file.tsx
//@jsx: react
//@jsxFactory: h
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

declare var h: any;

<div />;
