//// [tests/cases/conformance/jsx/tsxDynamicTagName3.tsx] ////

//// [tsxDynamicTagName3.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		div: any
	}
}

var CustomTag: "h1" = "h1";
<CustomTag> Hello World </CustomTag>  // This should be an error. we will try look up string literal type in JSX.IntrinsicElements

//// [tsxDynamicTagName3.jsx]
var CustomTag = "h1";
<CustomTag> Hello World </CustomTag>; // This should be an error. we will try look up string literal type in JSX.IntrinsicElements
