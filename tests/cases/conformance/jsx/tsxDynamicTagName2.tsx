// @jsx: preserve

declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
        div: any
	}
}

var customTag = "h1";
<customTag> Hello World </customTag>  // This should be an error. The lower-case is look up as an intrinsic element name