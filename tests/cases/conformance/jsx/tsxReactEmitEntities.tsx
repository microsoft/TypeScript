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
<div>&#0123;&#123;braces&#x7d;&#x7D;</div>;
// Escapes do nothing
<div>\n</div>;

// Also works in string literal attributes
<div attr="&#0123;&hellip;&#x7D;\"></div>;
// Does not happen for a string literal that happens to be inside an attribute (and escapes then work)
<div attr={"&#0123;&hellip;&#x7D;\""}></div>;
// Preserves single quotes
<div attr='"'></div>;
// https://github.com/microsoft/TypeScript/issues/35732
<div>&#x1F408;&#x1F415;&#128007;&#128017;</div>;