//// [tests/cases/conformance/jsx/jsxParsingError2.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

//// [Error1.tsx]
// Issue error about missing span closing tag, not missing div closing tag
let x1 = <div><span></div>;

//// [Error2.tsx]
let x2 = <div></span>;


//// [Error3.tsx]
let x3 = <div>;


//// [Error4.tsx]
let x4 = <div><div></span>;

//// [Error5.tsx]
let x5 = <div><span>



//// [file.jsx]
//// [Error1.jsx]
// Issue error about missing span closing tag, not missing div closing tag
var x1 = <div><span></></div>;
//// [Error2.jsx]
var x2 = <div></span>;
//// [Error3.jsx]
var x3 = <div>;

</>;
//// [Error4.jsx]
var x4 = <div><div></span>;
</>;
//// [Error5.jsx]
var x5 = <div><span>

</></>;
