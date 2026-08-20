//// [tests/cases/compiler/mappedTypeHomomorphismWithPriorKeyofTChecks1.ts] ////

//// [mappedTypeHomomorphismWithPriorKeyofTChecks1.ts]
type SharedUnionFieldsDeep1<T> = [T] extends [unknown[]]
  ? // Keep only tuple positions guaranteed across the union.
    1 extends T["length"]
    ? [T[0]]
    : T
  : keyof T extends infer CommonKeys
  ? ([CommonKeys] extends [never] ? true : false) extends false
    ? {
        [Key in keyof T]: SharedUnionFieldsDeep1<T[Key]>;
      }
    : {}
  : T;

// distributes
declare const actual1: SharedUnionFieldsDeep1<
  { tuple: [number] } | { tuple: [number, string] }
>;

type SharedUnionFieldsDeep2<T> = [T] extends [unknown[]]
  ? // Keep only tuple positions guaranteed across the union.
    1 extends T["length"]
    ? [T[0]]
    : T
  : keyof T extends infer CommonKeys
  ? ([CommonKeys] extends [never] ? true : false) extends false
    ? keyof T extends infer Keys extends PropertyKey
      ? {
          [Key in Keys]: SharedUnionFieldsDeep2<T[Key & keyof T]>;
        }
      : never
    : {}
  : T;

// doesn't distribute
declare const actual2: SharedUnionFieldsDeep2<
  { tuple: [number] } | { tuple: [number, string] }
>;

// `& unknown` used here just to avoid printing type alias at actual3
type SharedUnionFieldsDeepMappedType3<T, K extends keyof T = keyof T> = {
  [Key in K]: SharedUnionFieldsDeep3<T[Key]>;
} & unknown;

type SharedUnionFieldsDeep3<T> = [T] extends [unknown[]]
  ? // Keep only tuple positions guaranteed across the union.
    1 extends T["length"]
    ? [T[0]]
    : T
  : keyof T extends infer CommonKeys
  ? ([CommonKeys] extends [never] ? true : false) extends false
    ? SharedUnionFieldsDeepMappedType3<T>
    : {}
  : T;

// doesn't distribute either
declare const actual3: SharedUnionFieldsDeep3<
  { tuple: [number] } | { tuple: [number, string] }
>;


//// [mappedTypeHomomorphismWithPriorKeyofTChecks1.js]
"use strict";
