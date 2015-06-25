//// [tsxElementResolution16.tsx]
declare module JSX {
}

interface Obj1 {
	new(n: string): {};
}
var obj1: Obj1;
<obj1 x={10} />; // Error (JSX.Element is implicit any)


//// [tsxElementResolution16.jsx]
var obj1;
<obj1 x={10}/>; // Error (JSX.Element is implicit any)
