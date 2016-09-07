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
<div>&#0123;&#123;braces&#x7d;&#x7D;</div>;


//// [file.js]
React.createElement("div", null, "Dot goes here: \u00B7 &notAnEntity; ");
React.createElement("div", null, "Be careful of \"-ed strings!");
React.createElement("div", null, "{{braces}}");
