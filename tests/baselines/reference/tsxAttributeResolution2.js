//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: Attribs1;
	}
}
interface Attribs1 {
	c1?: (x: string) => void;
}

// OK
<test1 c1={(x) => x.length} />; // OK
<test1 data-c1={(x) => x.leng} />; // OK


// Errors
<test1 c1={(x) => x.leng} />; // Error, no leng on 'string'


//// [file.jsx]
// OK
<test1 c1={function (x) { return x.length; }}/>; // OK
<test1 data-c1={function (x) { return x.leng; }}/>; // OK
// Errors
<test1 c1={function (x) { return x.leng; }}/>; // Error, no leng on 'string'
