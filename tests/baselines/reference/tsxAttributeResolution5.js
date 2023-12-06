//// [tests/cases/conformance/jsx/tsxAttributeResolution5.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: Attribs1;
		test2: Attribs2;
	}
}
interface Attribs1 {
	x: string;
}

interface Attribs2 {
	toString(): string;
}

function make1<T extends {x: string}> (obj: T) {
	return <test1 {...obj} />; // OK
}

function make2<T extends {x: number}> (obj: T) {
	return <test1 {...obj} />; // Error (x is number, not string)
}

function make3<T extends {y: string}> (obj: T) {
	return <test1 {...obj} />; // Error, missing x
}


<test1 {...{}} />; // Error, missing x
<test2 {...{}} />; // Error, missing toString


//// [file.jsx]
function make1(obj) {
    return <test1 {...obj}/>; // OK
}
function make2(obj) {
    return <test1 {...obj}/>; // Error (x is number, not string)
}
function make3(obj) {
    return <test1 {...obj}/>; // Error, missing x
}
<test1 {...{}}/>; // Error, missing x
<test2 {...{}}/>; // Error, missing toString
