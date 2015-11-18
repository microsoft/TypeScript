//@filename: file.tsx
//@jsx: react
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

// Emit ' word' in the last string
<div>word <code>code</code> word</div>;
// Same here
<div><code>code</code> word</div>;
// And here
<div><code /> word</div>;

