//@filename: file.tsx
//@jsx: preserve
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements { div; span; }
}

var x = <div><div><span><div></div></span></div></div>;
