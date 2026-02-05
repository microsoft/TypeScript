//// [tests/cases/compiler/jsxPreserveWithJsInput.ts] ////

//// [a.js]
var elemA = 42;

//// [b.jsx]
var elemB = <b>{"test"}</b>;

//// [c.js]
var elemC = <c>{42}</c>;

//// [d.ts]
var elemD = 42;

//// [e.tsx]
var elemE = <e>{true}</e>;


//// [a.js]
"use strict";
var elemA = 42;
//// [b.jsx]
"use strict";
var elemB = <b>{"test"}</b>;
//// [c.js]
"use strict";
var elemC = <c>{42}</c>;
//// [d.js]
"use strict";
var elemD = 42;
//// [e.jsx]
"use strict";
var elemE = <e>{true}</e>;
