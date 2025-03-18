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
let x1 = <div><span></></div>;
//// [Error2.jsx]
let x2 = <div></span>;
//// [Error3.jsx]
let x3 = <div>;

</>;
//// [Error4.jsx]
let x4 = <div><div></span>;
</>;
//// [Error5.jsx]
let x5 = <div><span>

</></>;
