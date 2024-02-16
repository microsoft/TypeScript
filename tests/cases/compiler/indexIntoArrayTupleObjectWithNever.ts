// @strict: true

type A = { a: 42 }[never]

type B = [42][never]

type C = Array<42>[never]

type D = 42[never]

type E = any[never] // any


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

// -----------------------------------------------------------------

type T2 = Record<string, boolean>[never]
type T3 = Record<`--${string}`, boolean>[never]


const obj = {
  arr: [],
};

const objWithIndex: Record<string, boolean> = {};

const el = obj.arr[0];
const result = objWithIndex[el];

function testUnreachableNeverType(smt: number | string) {
  if(typeof smt === "number") {}
  else if(typeof smt === "string") {}
  else {
    const result = objWithIndex[smt]
  }
}

// -----------------------------------------------------------------
