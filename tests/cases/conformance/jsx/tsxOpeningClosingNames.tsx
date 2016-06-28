//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
}

declare module A.B.C {
  var D: any;
}

<A.B.C.D>foo</A . B . C.D>
