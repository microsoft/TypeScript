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

//// [file.js]
React.createElement("div", null, "Dot goes here: \u00B7 &notAnEntity; ");
React.createElement("div", null, "Be careful of \"-ed strings!");
React.createElement("div", null, "{{braces}}");
// Escapes do nothing
React.createElement("div", null, "\\n");
// Also works in string literal attributes
React.createElement("div", { attr: "{\u2026}\\" });
// Does not happen for a string literal that happens to be inside an attribute (and escapes then work)
React.createElement("div", { attr: "&#0123;&hellip;&#x7D;\"" });
// Preserves single quotes
React.createElement("div", { attr: '"' });
// https://github.com/microsoft/TypeScript/issues/35732
React.createElement("div", null, "\uD83D\uDC08\uD83D\uDC15\uD83D\uDC07\uD83D\uDC11");
