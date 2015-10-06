//// [tsxParseTests2.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements { div; span; }
}

var x = </**/div></div>;


//// [tsxParseTests2.jsx]
var x = <div></div>;
