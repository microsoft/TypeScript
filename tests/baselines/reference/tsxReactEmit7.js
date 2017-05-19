//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

var m = <div x-y="val"></div>;
var n = <div xx-y="val"></div>;
var o = <div x-yy="val"></div>;
var p = <div xx-yy="val"></div>;

// Investigation
var a = <div x="val"></div>;
var b = <div xx="val"></div>;
var c = <div xxx="val"></div>;
var d = <div xxxx="val"></div>;
var e = <div xxxxx="val"></div>;


//// [file.js]
var m = React.createElement("div", { "x-y": "val" });
var n = React.createElement("div", { "xx-y": "val" });
var o = React.createElement("div", { "x-yy": "val" });
var p = React.createElement("div", { "xx-yy": "val" });
// Investigation
var a = React.createElement("div", { x: "val" });
var b = React.createElement("div", { xx: "val" });
var c = React.createElement("div", { xxx: "val" });
var d = React.createElement("div", { xxxx: "val" });
var e = React.createElement("div", { xxxxx: "val" });
