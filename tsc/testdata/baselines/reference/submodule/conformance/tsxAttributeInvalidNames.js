//// [tests/cases/conformance/jsx/tsxAttributeInvalidNames.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: { "data-foo"?: string };
		test2: { "data-foo"?: string };
	}
}

// Invalid names
<test1 32data={32} />;
<test2 -data={32} />;

//// [file.jsx]
// Invalid names
<test1 />;
32;
data = { 32:  } /  > ;
<test2 /> - data;
{
    32;
}
/>;
