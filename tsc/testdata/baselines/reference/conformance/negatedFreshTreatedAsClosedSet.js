//// [tests/cases/conformance/types/negated/negatedFreshTreatedAsClosedSet.ts] ////

//// [negatedFreshTreatedAsClosedSet.ts]
// from https://github.com/Microsoft/TypeScript/issues/4183
type Distinct<A, B> = (A | B) & not (A & B);
declare var o1: {x: any};
declare var o2: {y: any};

declare function f1(x: Distinct<typeof o1, typeof o2>): void;

f1({x: 0}); // OK
f1({y: 0}); // OK
f1({x: 0, y: 0}); // Should error


//// [negatedFreshTreatedAsClosedSet.js]
"use strict";
f1({ x: 0 }); // OK
f1({ y: 0 }); // OK
f1({ x: 0, y: 0 }); // Should error
