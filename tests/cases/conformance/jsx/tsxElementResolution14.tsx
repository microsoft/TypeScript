//@filename: file.tsx
//@jsx: preserve
declare namespace JSX {
	interface Element { }
}

interface Obj1 {
	new(n: string): {};
}
var obj1: Obj1;
<obj1 x={10} />; // OK
