// @strict: true
// @declaration: true

namespace reflexiveIdentityRelation {
    type Equals<A, B> = (<T>() => T extends B ? 1 : 0) extends (<T>() => T extends A ? 1 : 0) ? true : false;

    type Intersection = Equals<{a: 1} & {a: 1}, {a: 1}>;  // true
    type Union = Equals<{a: 1} | {a: 1}, {a: 1}>;  // true
    type UnionOfIntersection = Equals<{a: 1} & {b: 2} | {a: 1} & {b: 2}, {a: 1} & {b: 2}>;  // true

    // The intersection distributes to `{a: 1} & {a: 1} | {a: 1} & {b: 2} | {b: 2} & {a: 1} | {b: 2} & {b: 2}`
    // which is not identical to `{a: 1} | {b: 2}`
    type IntersectionOfUnion = Equals<({a: 1} | {b: 2}) & ({a: 1} | {b: 2}), {a: 1} | {b: 2}>;  // false
}
