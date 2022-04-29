//// [file.tsx]
declare module JSX {
	interface Element { }
	interface ElementClass {
		render: any;
	}
	interface IntrinsicElements { }
}

interface Obj1type {
	new(n: string): { x: number };
}
var Obj1: Obj1type;
<Obj1 x={10} />; // Error, no render member

interface Obj2type {
	(n: string): { x: number; render: any; };
}
var Obj2: Obj2type;
<Obj2 x={32} render={100} />; // OK


//// [file.jsx]
var Obj1;
<Obj1 x={10}/>; // Error, no render member
var Obj2;
<Obj2 x={32} render={100}/>; // OK
