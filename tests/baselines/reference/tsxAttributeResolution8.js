//// [tsxAttributeResolution8.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: {x: string};
	}
}

var x: any;
// Should be OK
<test1 {...x} />

//// [tsxAttributeResolution8.jsx]
var x;
// Should be OK
<test1 {...x}/>;
