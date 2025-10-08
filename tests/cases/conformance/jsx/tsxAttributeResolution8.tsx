//@filename: file.tsx
//@jsx: preserve
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: {x: string};
	}
}

var x: any;
// Should be OK
<test1 {...x} />