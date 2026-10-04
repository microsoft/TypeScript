//// [tests/cases/conformance/jsx/tsxOpeningClosingNames.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
}

declare namespace A.B.C {
  var D: any;
}

<A.B.C.D>foo</A . B . C.D>


//// [file.jsx]
"use strict";
<A.B.C.D>foo</A.B.C.D>;
