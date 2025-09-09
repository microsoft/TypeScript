//// [tests/cases/conformance/jsx/tsxParseTests1.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements { div; span; }
}

var x = <div><div><span><div></div></span></div></div>;


//// [file.jsx]
var x = <div><div><span><div></div></span></div></div>;
