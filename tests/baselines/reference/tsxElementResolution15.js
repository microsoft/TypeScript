//// [tests/cases/conformance/jsx/tsxElementResolution15.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface ElementAttributesProperty { pr1: any; pr2: any; }
	interface IntrinsicElements { }
}

interface Obj1type {
	new(n: string): {};
}
var Obj1: Obj1type;
<Obj1 x={10} />; // Error


//// [file.jsx]
var Obj1;
<Obj1 x={10}/>; // Error
