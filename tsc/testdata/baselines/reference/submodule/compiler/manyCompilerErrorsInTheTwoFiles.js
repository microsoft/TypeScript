//// [tests/cases/compiler/manyCompilerErrorsInTheTwoFiles.ts] ////

//// [a.ts]
const a =!@#!@$
const b = !@#!@#!@#!
OK!
HERE's A shouty thing
GOTTA GO FAST

//// [b.ts]
fhqwhgads
to
limit

//// [a.js]
"use strict";
const a = !();
!();
const b = !();
!();
!();
!OK;
HERE;
's A shouty thing;
GOTTA;
GO;
FAST;
//// [b.js]
"use strict";
fhqwhgads;
to;
limit;
