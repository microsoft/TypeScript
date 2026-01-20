// @jsx: preserve

declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		div: any
	}
}

var CustomTag: "h1" = "h1";
<CustomTag> Hello World </CustomTag>  // This should be an error. we will try look up string literal type in JSX.IntrinsicElements