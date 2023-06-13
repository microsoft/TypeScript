//// [tests/cases/conformance/salsa/thisPropertyAssignment.ts] ////

//// [a.js]
// This test is asserting that a single property/element access
// on `this` is a special assignment declaration, but chaining
// off that does not create additional declarations. I’m not sure
// if it needs to be that way in JavaScript; the test simply
// ensures no accidental changes were introduced while allowing
// element access assignments to create declarations.

this.x = {};
this.x.y = {};
this["y"] = {};
this["y"]["z"] = {};

/** @constructor */
function F() {
  this.a = {};
  this.a.b = {};
  this["b"] = {};
  this["b"]["c"] = {};
}

const f = new F();
f.a;
f.b;




//// [a.d.ts]
/** @constructor */
declare function F(): void;
declare class F {
    a: {};
    b: {};
}
declare var x: {} | undefined;
declare var y: {} | undefined;
declare const f: F;
