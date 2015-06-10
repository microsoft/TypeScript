//// [tsxElementResolution4.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
	    div: { n: string; };
	    span: { m: string; };
	}
}

// OK
<div n='x' />;

// OK
<span m='ok' />;

// Error
<span q='' />;


//// [tsxElementResolution4.jsx]
// OK
<div n='x'/>;
// OK
<span m='ok'/>;
// Error
<span q=''/>;
