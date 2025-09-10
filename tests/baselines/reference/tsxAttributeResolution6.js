//// [tests/cases/conformance/jsx/tsxAttributeResolution6.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: { n?: boolean; s?: string};
		test2: { n: boolean; };
	}
}

// Error
<test1 s />;
<test1 n='true' />;
<test2 />;

// OK
<test1 n />;
<test1 n={false} />;
<test2 n />;


//// [file.jsx]
// Error
<test1 s/>;
<test1 n='true'/>;
<test2 />;
// OK
<test1 n/>;
<test1 n={false}/>;
<test2 n/>;
