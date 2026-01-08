// @jsx: preserve

declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		div: any
		h1: any
	}
}

var CustomTag: "h1" = "h1";
<CustomTag> Hello World </CustomTag>