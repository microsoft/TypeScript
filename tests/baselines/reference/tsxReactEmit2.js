//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

var p1, p2, p3;
var spreads1 = <div {...p1}>{p2}</div>;
var spreads2 = <div {...p1}>{p2}</div>;
var spreads3 = <div x={p3} {...p1}>{p2}</div>;
var spreads4 = <div {...p1} x={p3} >{p2}</div>;
var spreads5 = <div x={p2} {...p1} y={p3}>{p2}</div>;


//// [file.js]
var p1, p2, p3;
var spreads1 = React.createElement("div", React.__spread({}, p1), p2);
var spreads2 = React.createElement("div", React.__spread({}, p1), p2);
var spreads3 = React.createElement("div", React.__spread({x: p3}, p1), p2);
var spreads4 = React.createElement("div", React.__spread({}, p1, {x: p3}), p2);
var spreads5 = React.createElement("div", React.__spread({x: p2}, p1, {y: p3}), p2);
