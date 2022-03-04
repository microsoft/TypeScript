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
var a = !;
!;
var b = !;
!;
!;
!OK;
HERE;
's A shouty thing;
GOTTA;
GO;
FAST;
//// [b.js]
fhqwhgads;
to;
limit;
