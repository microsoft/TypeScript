//// [tests/cases/compiler/indexIntoArrayTupleObjectWithNever.ts] ////

//// [indexIntoArrayTupleObjectWithNever.ts]
type A = { a: 42 }[never]

type B = [42][never]

type C = Array<42>[never]


// -----------------------------------------------------------------

type Indexes<T extends readonly any[]> = keyof T & `${number}`

declare namespace IfNoDuplicateElements {
    export type Duplicate = "Duplicate"
    export type NotDuplicate = "NotDuplicate"
    export type HasDuplicates<T extends readonly any[]> = {
         [K in Indexes<T>]: T[K] extends T[Exclude<Indexes<T>, K>] ? Duplicate : NotDuplicate
    }[Indexes<T>]
}

export type IfNoDuplicateElements<
    T extends readonly any[],
    True = T,
    False = never
> = IfNoDuplicateElements.Duplicate extends IfNoDuplicateElements.HasDuplicates<T> ? False : True

type T0 = IfNoDuplicateElements<[1], true, false>
type T1 = IfNoDuplicateElements<[1,1], true, false>

//// [indexIntoArrayTupleObjectWithNever.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
