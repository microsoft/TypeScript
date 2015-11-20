//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		test1: Attribs1;
	}
}
interface Attribs1 {
	x(n: string): void;
}

// OK
<test1 {... {x: (n) => 0} } />;

// Error, no member 'len' on 'string'
<test1 {... {x: (n) => n.len} } />;


//// [file.jsx]
// OK
<test1 {...{ x: function (n) { return 0; } }}/>;
// Error, no member 'len' on 'string'
<test1 {...{ x: function (n) { return n.len; } }}/>;
