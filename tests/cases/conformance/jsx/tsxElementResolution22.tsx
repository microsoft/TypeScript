//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
	interface ElementTypeProperty { returnType; otherProperty; }
}

class Obj1 {
}

const obj = <Obj1 param="123"/>; // OK
