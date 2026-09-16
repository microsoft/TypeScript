//// [tests/cases/conformance/salsa/topLevelThisAssignment.ts] ////

//// [a.js]
this.a = 10;
this.a;
a;

//// [b.js]
this.a;
a;


//// [a.js]
"use strict";
this.a = 10;
this.a;
a;
//// [b.js]
"use strict";
this.a;
a;
