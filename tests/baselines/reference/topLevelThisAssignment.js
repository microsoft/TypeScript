//// [tests/cases/conformance/salsa/topLevelThisAssignment.ts] ////

//// [a.js]
this.a = 10;
this.a;
a;

//// [b.js]
this.a;
a;


//// [output.js]
this.a = 10;
this.a;
a;
this.a;
a;
