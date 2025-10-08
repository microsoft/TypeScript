//// [tests/cases/conformance/jsx/tsxDynamicTagName4.tsx] ////

//// [tsxDynamicTagName4.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		div: any
		h1: any
	}
}

var CustomTag: "h1" = "h1";
<CustomTag> Hello World </CustomTag>

//// [tsxDynamicTagName4.jsx]
var CustomTag = "h1";
<CustomTag> Hello World </CustomTag>;
