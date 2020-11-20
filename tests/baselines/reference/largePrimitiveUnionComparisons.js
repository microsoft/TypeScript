//// [largePrimitiveUnionComparisons.ts]
// This will expand to a union of 5000 string literals
type PrimitiveUnion = `x${0 | 1 | 2 | 3 | 4}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

function test(u: PrimitiveUnion) {}

test({} as any as (PrimitiveUnion | "zzzzz")); // Fails because of the extra element, not because of the size limit

//// [largePrimitiveUnionComparisons.js]
function test(u) { }
test({}); // Fails because of the extra element, not because of the size limit
