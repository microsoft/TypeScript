//// [tests/cases/conformance/jsx/tsxAttributeResolution8.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: {x: string};
	}
}

var x: any;
// Should be OK
<test1 {...x} />

//// [file.jsx]
var x;
// Should be OK
<test1 {...x}/>;
