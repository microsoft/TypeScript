//@filename: file.tsx
//@jsx: preserve
declare namespace JSX {
	interface Element { }
}

declare namespace A.B.C {
  var D: any;
}

<A.B.C.D>foo</A . B . C.D>
