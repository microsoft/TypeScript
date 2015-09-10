//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: { "data-foo"?: string };
	}
}

// Error
<test1 data-foo={32} />;

// OK
<test1 data-foo={'32'} />;
<test1 data-bar={'32'} />;
<test1 data-bar={32} />;


//// [file.jsx]
// Error
<test1 data-foo={32}/>;
// OK
<test1 data-foo={'32'}/>;
<test1 data-bar={'32'}/>;
<test1 data-bar={32}/>;
