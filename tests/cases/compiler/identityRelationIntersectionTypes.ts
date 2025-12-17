// @strict: true
// @declaration: true

namespace identityRelationIntersectionTypes {
    type Equals<A, B> = (<T>() => T extends B ? 1 : 0) extends (<T>() => T extends A ? 1 : 0) ? true : false;

    type GoodIntersection = Equals<{a: 1} & {b: 2}, {a: 1; b: 2}>;  // true

    // Interfaces aren't mergeable
    interface I {i: 3};
    type BadIntersection1 = Equals<{a: 1} & I, {a: 1; i: 3}>;  // false

    // Objects with call or constructor signatures aren't mergeable
    type BadIntersection2 = Equals<{a: 1} & {b: 2; (): void}, {a: 1; b: 2; (): void}>;  // false
    type BadIntersection3 = Equals<{a: 1} & {b: 2; new (): void}, {a: 1; b: 2; new (): void}>;  // false

    // Objects with index signatures aren't mergeable
    type BadIntersection4 = Equals<{a: 1} & {b: 2; [key: string]: number}, {a: 1; b: 2; [key: string]: number}>;  // false

    // Shouldn't merge intersection if any constituents aren't mergeable
    type StillBadIntersection1 = Equals<{a: 1} & {b: 2} & I, {a: 1; b: 2; i: 3}>;  // false
    type StillBadIntersection2 = Equals<{a: 1} & {b: 2} & I, {a: 1; b: 2} & I>;  // false

    // Parentheses don't matter because intersections are flattened
    type StillBadIntersection3 = Equals<({a: 1} & {b: 2}) & I, {a: 1; b: 2; i: 3}>;  // false
    type StillBadIntersection4 = Equals<({a: 1} & {b: 2}) & I, {a: 1; b: 2} & I>;  // false

    // Type aliases also don't prevent flattening
    type AB = {a: 1} & {b: 2};
    type StillBadIntersection5 = Equals<AB & I, {a: 1; b: 2; i: 3}>;  // false
    type StillBadIntersection6 = Equals<AB & I, {a: 1; b: 2} & I>;  // false

    type GoodDeepIntersection1 = Equals<{a: 0 | 1} & {a: 1 | 2}, {a: 1}>;  // true
    type GoodDeepIntersection2 = Equals<{a: {x: 1}} & {a: {y: 2}}, {a: {x: 1; y: 2}}>;  // true

    type GoodShallowBadDeepIntersection1 = Equals<{a: {x: 1}} & {a: {y: 2} & I}, {a: {x: 1; y: 2} & I}>;  // false
    type GoodShallowBadDeepIntersection2 = Equals<{a: {x: 1}} & {a: {y: 2} & I}, {a: {x: 1} & {y: 2} & I}>;  // true

    // Reduction applies to nested intersections
    type DeepReduction = Equals<{a: {x: 1}} & {a: {x: 2}}, {a: never}>;  // true

    // Intersections are distributed and merged if possible with union constituents
    type Distributed = Equals<
        {a: 1} & {b: 2} & ({c: 3} | {d: 4} | I),
        {a: 1; b: 2; c: 3} | {a: 1; b: 2; d: 4} | {a: 1} & {b: 2} & I
    >;  // true

    // Should work with recursive types
    type R1 = {a: R1; x: 1};
    type R2 = {a: R2; y: 1};
    type R = R1 & R2;

    type Recursive1 = Equals<R, {a: R1 & R2; x: 1; y: 1}>;  // true
    type Recursive2 = Equals<R, {a: {a: R1 & R2; x: 1; y: 1}; x: 1; y: 1}>;  // true
    type Recursive3 = Equals<R, {a: {a: {a: R1 & R2; x: 1; y: 1}; x: 1; y: 1}; x: 1; y: 1}>;  // true
    type Recursive4 = Equals<R, {a: {a: {a: R1 & R2; x: 1; y: 0}; x: 1; y: 1}; x: 1; y: 1}>;  // false
}
