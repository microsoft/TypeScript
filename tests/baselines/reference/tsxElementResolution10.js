//// [tests/cases/conformance/jsx/tsxElementResolution10.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface ElementClass {
		render: any;
	}
	interface IntrinsicElements { }
}

interface Obj1type {
	new(n: string): { x: number };
}
declare var Obj1: Obj1type;
<Obj1 x={10} />; // Error, no render member

interface Obj2type {
	(n: string): { x: number; render: any; };
}
declare var Obj2: Obj2type;
<Obj2 x={32} render={100} />; // OK


//// [file.jsx]
<Obj1 x={10}/>; // Error, no render member
<Obj2 x={32} render={100}/>; // OK
