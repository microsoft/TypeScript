//// [tsxParseTests1.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements { div; span; }
}

var x = <div><div><span><div></div></span></div></div>;


//// [tsxParseTests1.jsx]
var x = <div><div><span><div></div></span></div></div>;
