//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

var p1: any, p2: any, p3: any;
var spreads1 = <div {...p1}>{p2}</div>;
var spreads2 = <div {...p1}>{p2}</div>;
var spreads3 = <div x={p3} {...p1}>{p2}</div>;
var spreads4 = <div {...p1} x={p3} >{p2}</div>;
var spreads5 = <div x={p2} {...p1} y={p3}>{p2}</div>;


//// [file.jsx]
var p1, p2, p3;
var spreads1 = <div {...p1}>{p2}</div>;
var spreads2 = <div {...p1}>{p2}</div>;
var spreads3 = <div x={p3} {...p1}>{p2}</div>;
var spreads4 = <div {...p1} x={p3}>{p2}</div>;
var spreads5 = <div x={p2} {...p1} y={p3}>{p2}</div>;
