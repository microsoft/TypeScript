//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
	interface ElementTypeProperty { returnType; }
}

interface CustomType { }

class Obj1 {
	returnType: CustomType;
}
const obj = <Obj1 param="123"/>; // OK

const objSelfClosing = <Obj1/>; // OK

const Func = () => <Obj1/>;

const objFromFactory = <Func/>; // OK