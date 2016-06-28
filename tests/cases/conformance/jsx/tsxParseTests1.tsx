//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
	interface IntrinsicElements { div; span; }
}

var x = <div><div><span><div></div></span></div></div>;
