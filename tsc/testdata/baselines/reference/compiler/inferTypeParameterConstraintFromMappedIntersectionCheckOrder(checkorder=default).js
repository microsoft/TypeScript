//// [tests/cases/compiler/inferTypeParameterConstraintFromMappedIntersectionCheckOrder.ts] ////

//// [inferTypeParameterConstraintFromMappedIntersectionCheckOrder.ts]
// The constraint of U is inferred from the constraint of the type parameter
// of S. Instantiating S with U needs the constraint of U, so whether U
// satisfies object must not depend on whether I is queried before its type
// arguments are checked.

type Copy<T> = { [K in keyof T]: T[K] };
type S<T extends object> = Copy<{ x: 0 } & T>;
type I = {} extends S<infer U> ? U : never;


//// [inferTypeParameterConstraintFromMappedIntersectionCheckOrder.js]
"use strict";
// The constraint of U is inferred from the constraint of the type parameter
// of S. Instantiating S with U needs the constraint of U, so whether U
// satisfies object must not depend on whether I is queried before its type
// arguments are checked.
