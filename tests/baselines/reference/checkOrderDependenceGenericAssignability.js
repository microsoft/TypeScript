//// [checkOrderDependenceGenericAssignability.ts]
// #44572

interface Parent<A> {
  child: Child<A> | null;
  parent: Parent<A> | null;
}

interface Child<A, B = unknown> extends Parent<A> {
  readonly a: A;
  // This field isn't necessary to the repro, but the
  // type parameter is, so including it
  readonly b: B;
}

function fn<A>(inp: Child<A>) {
  // This assignability check defeats the later one
  const a: Child<unknown> = inp;
}

// Allowed initialization of pu
const pu: Parent<unknown> = { child: { a: 0, b: 0, child: null, parent: null }, parent: null };

// Should error
const notString: Parent<string> = pu;


//// [checkOrderDependenceGenericAssignability.js]
// #44572
function fn(inp) {
    // This assignability check defeats the later one
    var a = inp;
}
// Allowed initialization of pu
var pu = { child: { a: 0, b: 0, child: null, parent: null }, parent: null };
// Should error
var notString = pu;
