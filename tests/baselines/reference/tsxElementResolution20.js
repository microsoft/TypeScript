//// [tests/cases/conformance/jsx/tsxElementResolution20.tsx] ////

//// [file.tsx]
declare namespace JSX {
    interface IntrinsicElements { obj1: { x: number }; }
}

interface Obj1 {
	new(n: string): {};
}
var obj1: Obj1;
<obj1 x={10} />; // Error (JSX.Element is implicit any)


//// [file.jsx]
var obj1;
<obj1 x={10}/>; // Error (JSX.Element is implicit any)
