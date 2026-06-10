// @target: es2015
// @filename: file.tsx
// @jsx: react
declare namespace JSX {
	interface Element {}
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

// Numeric character references for lone surrogates should be preserved, not
// corrupted to U+FFFD. "\uD800" is a lone high surrogate; "\uDC00" a lone low.
const text = <div>&#xD800;a&#xDC00;</div>;
const attr = <div title="&#xD800;"></div>;

// A non-BMP code point reference is a single supplementary character.
const supplementary = <div>&#x1F600;</div>;
