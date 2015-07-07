//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
	interface ElementAttributesProperty { pr1: any; pr2: any; }
}

interface Obj1 {
	new(n: string): any;
}
var obj1: Obj1;
<obj1 x={10} />; // Error
