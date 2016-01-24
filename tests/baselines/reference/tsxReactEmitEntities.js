//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

<div>Dot goes here: &middot; &notAnEntity; </div>;
<div>Be careful of &quot;-ed strings!</div>;


//// [file.js]
React.createElement("div", null, "Dot goes here: · &notAnEntity; ");
React.createElement("div", null, "Be careful of \"-ed strings!");
