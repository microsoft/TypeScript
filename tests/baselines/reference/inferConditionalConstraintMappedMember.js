//// [tests/cases/compiler/inferConditionalConstraintMappedMember.ts] ////

//// [inferConditionalConstraintMappedMember.ts]
// Return keyof type without string index signature
type KeysWithoutStringIndex<T> =
    { [K in keyof T]: string extends K ? never : K } extends { [_ in keyof T]: infer U }
    ? U
    : never

// Only "foo" | "bar" as expected, [string] index signature removed
type test = KeysWithoutStringIndex<{ [index: string]: string; foo: string; bar: 'baz' }>
// KeysWithoutStringIndex<T> will always be a subset of keyof T, but is reported as unassignable
export type RemoveIdxSgn<T> = Pick<T, KeysWithoutStringIndex<T>>
  // ERROR:
  // Type 'KeysWithoutStringIndex<T>' does not satisfy the constraint 'keyof T'.
  //  Type 'unknown' is not assignable to type 'keyof T'.(2344)

//// [inferConditionalConstraintMappedMember.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ERROR:
// Type 'KeysWithoutStringIndex<T>' does not satisfy the constraint 'keyof T'.
//  Type 'unknown' is not assignable to type 'keyof T'.(2344)
