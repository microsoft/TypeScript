//// [tests/cases/conformance/jsx/tsxDynamicTagName2.tsx] ////

//// [tsxDynamicTagName2.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
        div: any
	}
}

var customTag = "h1";
<customTag> Hello World </customTag>  // This should be an error. The lower-case is look up as an intrinsic element name

//// [tsxDynamicTagName2.jsx]
var customTag = "h1";
<customTag> Hello World </customTag>; // This should be an error. The lower-case is look up as an intrinsic element name
