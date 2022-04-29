//@jsx: react
//@module: commonjs

//@filename: file.tsx
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
