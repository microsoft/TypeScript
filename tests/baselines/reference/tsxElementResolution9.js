//// [tests/cases/conformance/jsx/tsxElementResolution9.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { something; }
	interface IntrinsicElements { }
}

interface Obj1 {
	new(n: string): { x: number };
	new(n: number): { y: string };
}
declare var Obj1: Obj1;
<Obj1 />; // Error, return type is not an object type

interface Obj2 {
	(n: string): { x: number };
	(n: number): { y: string };
}
declare var Obj2: Obj2;
<Obj2 />; // Error, return type is not an object type

interface Obj3 {
	(n: string): { x: number };
	(n: number): { x: number; y: string };
}
declare var Obj3: Obj3;
<Obj3 x={42} />; // OK


//// [file.jsx]
<Obj1 />; // Error, return type is not an object type
<Obj2 />; // Error, return type is not an object type
<Obj3 x={42}/>; // OK
