//@filename: file.tsx
//@jsx: react
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

<div>Dot goes here: &middot; &notAnEntity; </div>;
<div>Be careful of &quot;-ed strings!</div>;
