//@filename: file.tsx
//@jsx: preserve
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
