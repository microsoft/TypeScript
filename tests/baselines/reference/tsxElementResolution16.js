//// [tests/cases/conformance/jsx/tsxElementResolution16.tsx] ////

//// [file.tsx]
declare module JSX {
}

interface Obj1 {
	new(n: string): {};
}
var obj1: Obj1;
<obj1 x={10} />; // Error (JSX.Element is implicit any)


//// [file.jsx]
var obj1;
<obj1 x={10}/>; // Error (JSX.Element is implicit any)
