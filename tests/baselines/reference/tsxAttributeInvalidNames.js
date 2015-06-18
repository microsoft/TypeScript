//// [tsxAttributeInvalidNames.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: { "data-foo"?: string };
	}
}

// Invalid names
<test1 32data={32} />;
<test1 -data={32} />;

//// [tsxAttributeInvalidNames.jsx]
// Invalid names
<test1> 32data={32} />;
<test1> -data={32} />;</></>;
