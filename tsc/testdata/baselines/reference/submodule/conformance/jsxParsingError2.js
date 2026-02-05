//// [tests/cases/conformance/jsx/jsxParsingError2.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

//// [Error1.tsx]
// Issue error about missing span closing tag, not missing div closing tag
let x1 = <div><span></div>;

//// [Error2.tsx]
let x2 = <div></span>;


//// [Error3.tsx]
let x3 = <div>;


//// [Error4.tsx]
let x4 = <div><div></span>;

//// [Error5.tsx]
let x5 = <div><span>



//// [file.jsx]
"use strict";
//// [Error1.jsx]
"use strict";
// Issue error about missing span closing tag, not missing div closing tag
let x1 = <div><span></></div>;
//// [Error2.jsx]
"use strict";
let x2 = <div></span>;
//// [Error3.jsx]
"use strict";
let x3 = <div>;

</>;
//// [Error4.jsx]
"use strict";
let x4 = <div><div></span>;
</>;
//// [Error5.jsx]
"use strict";
let x5 = <div><span>

</></>;
