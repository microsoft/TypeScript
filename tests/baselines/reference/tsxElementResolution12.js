//// [tests/cases/conformance/jsx/tsxElementResolution12.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface ElementAttributesProperty { pr: any; }
	interface IntrinsicElements { }
}

interface Obj1type {
	new(n: string): any;
}
var Obj1: Obj1type;
<Obj1 x={10} />; // OK

interface Obj2type {
	new(n: string): { q?: number; pr: any };
}
var Obj2: Obj2type;
<Obj2 x={10} />; // OK

interface Obj3type {
	new(n: string): { x: number; };
}
var Obj3: Obj3type;
<Obj3 x={10} />; // Error
var attributes: any;
<Obj3 {...attributes} />; // Error
<Obj3 {...{}} />; // OK

interface Obj4type {
	new(n: string): { x: number; pr: { x: number; } };
}
var Obj4: Obj4type;
<Obj4 x={10} />; // OK
<Obj4 x={'10'} />; // Error


//// [file.jsx]
var Obj1;
<Obj1 x={10}/>; // OK
var Obj2;
<Obj2 x={10}/>; // OK
var Obj3;
<Obj3 x={10}/>; // Error
var attributes;
<Obj3 {...attributes}/>; // Error
<Obj3 {...{}}/>; // OK
var Obj4;
<Obj4 x={10}/>; // OK
<Obj4 x={'10'}/>; // Error
