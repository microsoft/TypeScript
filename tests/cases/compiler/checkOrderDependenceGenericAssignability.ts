/*

Debugging notes: variance measurement for `Parent` is getting set to
`VarianceFlags.Independent`, implying that its type parameter is never
witnessed at all. It arrived at this conclusion by checking the assignability
of `Parent` instantiated with marker types. It first checks assignability in
both directions with instantiations with super/sub-related marker types, and
assignability appears to return true in both directions; however, it actually
is returning `Ternary.Unknown`, due to being unable to answer questions about
the assignability of the types' `parent` and `child` properties without knowing
their variances. After (incorrectly) concluding that `Parent` is bivariant on `A`,
it checks another set of instantiations with markers that are unrelated to each
other. That too comes back as `Ternary.Unknown` but is interpreted as true, so
the variance gets updated to `Independent`, since instantiating `Parent` with
all kinds of different markers with different assignability to each other
apparently had no effect on the instantiations' assignability to each other.

I'm not sure if any of those comparisons ever actually looked at `a` and `b`,
which should provide some non-recursive concrete variance information. I'm also
not sure if `outofbandVarianceMarkerHandler` should have been called at some point,
but it was not.

*/

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
