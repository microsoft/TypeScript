//// [tests/cases/conformance/salsa/topLevelThisAssignment.ts] ////

//// [a.js]
this.a = 10;
this.a;
a;
unknown;
this.unknown;

// also, improved types for this-prefixed globals like eval:
this.eval('hi');

//// [b.js]
this.a;
a;
unknown;
this.unknown;


//// [output.js]
this.a = 10;
this.a;
a;
unknown;
this.unknown;
// also, improved types for this-prefixed globals like eval:
this.eval('hi');
this.a;
a;
unknown;
this.unknown;
