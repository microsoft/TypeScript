//@filename: file.tsx
//@jsx: preserve
declare namespace JSX {
	interface Element { }
	interface ElementAttributesProperty { }
	interface IntrinsicElements { }
}

interface Obj1type {
	new(n: string): any;
}
declare var Obj1: Obj1type;
<Obj1 x={10} />; // OK

interface Obj2type {
	new(n: string): { q?: number };
}
declare var Obj2: Obj2type;
<Obj2 x={10} />; // Error

interface Obj3type {
	new(n: string): { x: number; };
}
declare var Obj3: Obj3type;
<Obj3 x={10} />; // OK
