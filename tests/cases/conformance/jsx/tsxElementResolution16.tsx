//@filename: file.tsx
//@jsx: preserve
//@noImplicitAny: true
declare module JSX {
}

interface Obj1 {
	new(n: string): {};
}
var obj1: Obj1;
<obj1 x={10} />; // Error (JSX.Element is implicit any)
