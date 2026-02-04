//// [tests/cases/conformance/jsx/jsxParsingError3.tsx] ////

//// [file.tsx]
declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [s: string]: any;
  }
}

//// [Error1.tsx]
let x1 = <div>}</div>;

//// [Error2.tsx]
let x2 = <div>></div>;

//// [Error3.tsx]
let x3 = <div>{"foo"}}</div>;

//// [Error4.tsx]
let x4 = <div>{"foo"}></div>;

//// [Error5.tsx]
let x5 = <div>}{"foo"}</div>;

//// [Error6.tsx]
let x6 = <div>>{"foo"}</div>;


//// [file.jsx]
"use strict";
//// [Error1.jsx]
"use strict";
let x1 = <div>}</div>;
//// [Error2.jsx]
"use strict";
let x2 = <div>></div>;
//// [Error3.jsx]
"use strict";
let x3 = <div>{"foo"}}</div>;
//// [Error4.jsx]
"use strict";
let x4 = <div>{"foo"}></div>;
//// [Error5.jsx]
"use strict";
let x5 = <div>}{"foo"}</div>;
//// [Error6.jsx]
"use strict";
let x6 = <div>>{"foo"}</div>;
